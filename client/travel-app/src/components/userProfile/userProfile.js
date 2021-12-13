import React, { useEffect, useState } from "react";
import "./userProfile.css";
// import "./userProfileSys.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Edit, KeyboardArrowDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import {
  getMyBookings,
  clearGetMyBookingErrAct,
} from "../../action/bookingAct";
import MyBookings from "../myBookings/myBookings";

function UserProfile() {
  let { isAuthenticated, user, loadError } = useSelector((state) => state.user);
  let { myBookings, myBookingsErr } = useSelector((state) => state.myBookings);
  let alert = useAlert();
  let dispatch = useDispatch();
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSzEdit = "1.5rem";
  if (matches1920) {
    fntSzEdit = "2rem";
  }
  if (matches1366) {
    fntSzEdit = "1.5rem";
  }
  if (matches414) {
    fntSzEdit = "2rem";
  }
  let [userProf360Dis, setUserProf360Dis] = useState(false);
  let [rentPropDis, setRentPropDis] = useState(false);

  useEffect(() => {
    if (loadError) {
      alert.error(loadError);
    }
    if (myBookingsErr) {
      alert.error(myBookingsErr);
      dispatch(clearGetMyBookingErrAct());
    }
    dispatch(getMyBookings());
  }, [loadError, dispatch, alert, user, myBookingsErr]);
  return (
    <>
      <section className="userProfileSection">
        {isAuthenticated ? (
          <>
            <div className="userProfileCont">
              <div className="editprofileCont">
                <img src={user.avatar.url} alt="img" />
                <div className="nameEmailCont">
                  <div className="nameEmailSubCont">
                    <h1>{user.name}</h1>
                    <span>{user.email}</span>
                  </div>
                  <Link to={"/me/updateUser"} className="editLink">
                    <div className="editIconCont">
                      <Edit
                        className="editIcon"
                        style={{ fontSize: fntSzEdit }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              {matches360 || matches414 ? (
                <>
                  <div className="userProfOpt360">
                    <Link
                      to={"/me/myProperty"}
                      className={
                        rentPropDis
                          ? "rentPropLink"
                          : "rentPropLink actvRentProp"
                      }
                    >
                      <div className="rentYrProperty">my properties</div>
                    </Link>
                    <Link
                      to={"/me/rentProperty"}
                      className={
                        rentPropDis
                          ? "rentPropLink actvRentProp"
                          : "rentPropLink"
                      }
                    >
                      <div className="rentYrProperty">rent a property</div>
                    </Link>
                    <KeyboardArrowDown
                      onClick={() => setUserProf360Dis(!userProf360Dis)}
                    />
                  </div>
                  <div
                    className={
                      userProf360Dis
                        ? "userProf360OptWin actv360UserProf"
                        : "userProf360OptWin"
                    }
                  >
                    <span
                      onClick={() => {
                        setRentPropDis(false);
                        setUserProf360Dis(false);
                      }}
                      className="userProf360Span"
                    >
                      my properties
                    </span>
                    <span
                      onClick={() => {
                        setRentPropDis(true);
                        setUserProf360Dis(false);
                      }}
                      className="userProf360Span"
                    >
                      rent a property
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Link to={"/me/myProperty"} className="rentPropLink">
                    <div className="rentYrProperty">my properties</div>
                  </Link>
                  <Link to={"/me/rentProperty"} className="rentPropLink">
                    <div className="rentYrProperty">rent a property</div>
                  </Link>
                </>
              )}
            </div>
            <div className="myBookingsCont">
              <div className="myBookingsContTitle">
                <h1>My Bookings</h1>
              </div>

              {myBookings ? (
                <div className="myBookingsSubCont">
                  {myBookings.map((elem, index) => {
                    return (
                      <div
                        className="bookingcardContUsrProf"
                        key={`bookingcardContUsrProf${index}`}
                      >
                        <MyBookings
                          key={`myBookingsCard${index}`}
                          prop={elem}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                "noBookings !"
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
}

export default UserProfile;
