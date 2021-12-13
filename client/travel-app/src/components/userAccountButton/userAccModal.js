import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./userAccModal.css";
// import "./userAccModalSys.css";
import { ExitToApp, Help, Settings, AccountCircle } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { logoutUser } from "../../action/userAction";
import { useAlert } from "react-alert";
import { clearError } from "../../action/userAction";
import { Link } from "react-router-dom";

function UserAccModal() {
  let userAccModRef = useRef(null);
  let [disply, setDisply] = useState(false);
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let accUserFntSz = "1.5rem";
  let accUserModFntSz = "1.5rem";
  if (matches1920) {
    accUserFntSz = "2.3rem";
    accUserModFntSz = "2.3rem";
  }
  if (matches1366) {
    accUserFntSz = "1.6rem";
    accUserModFntSz = "1.8rem";
  }
  let dispatch = useDispatch();
  let alert = useAlert();
  let { user, error, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    let handler = (event) => {
      if (!userAccModRef.current.contains(event.target)) {
        setDisply(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [disply, alert, error, dispatch, isAuthenticated]);
  return (
    <>
      <div ref={userAccModRef}>
        <AccountCircle
          className="icon"
          onClick={() => setDisply(!disply)}
          style={{ fontSize: accUserFntSz }}
        />
        <div className={disply ? "userAccModal active" : "userAccModal"}>
          <ul>
            <Link
              to={"/me"}
              className="linkToUsrProf"
              onClick={() => setDisply(!disply)}
            >
              <li className="userAccModalLi">
                <img
                  src={user.avatar.url}
                  alt="img"
                  className="userAccModImg"
                />{" "}
                <span>{user.name}</span>
              </li>
            </Link>
            <li
              onClick={() => dispatch(logoutUser())}
              className="userAccModalLi"
            >
              <ExitToApp style={{ fontSize: accUserModFntSz }} />{" "}
              <span>logout</span>
            </li>
            <li className="userAccModalLi">
              <Help style={{ fontSize: accUserModFntSz }} /> <span>help</span>
            </li>
            <li className="userAccModalLi">
              <Settings style={{ fontSize: accUserModFntSz }} />{" "}
              <span>setting</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserAccModal;
