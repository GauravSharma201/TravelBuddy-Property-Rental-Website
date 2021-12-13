import React, { useState, useEffect } from "react";
import {
  List,
  Close,
  ExitToApp,
  Help,
  Settings,
  Input,
  ExpandMore,
} from "@material-ui/icons";
import "./mobListModal.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, clearError } from "../../action/userAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

function MobListModal({ lgSgnModHandler }) {
  let [disply, setDisply] = useState(false);
  let [holiday, setHoliday] = useState(false);
  let [flights, setFlights] = useState(false);
  let [hotels, setHotels] = useState(false);
  let [forex, setForex] = useState(false);
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches375 = useMediaQuery("(max-width:375px)");
  let matches360 = useMediaQuery("(max-width:360px)");
  let mobListModOpen = () => {
    document.body.style.overflow = "hidden";
    setDisply(true);
  };
  let mobListModClose = () => {
    document.body.style.overflow = "visible";
    setDisply(false);
  };

  let handleMobListOpt = () => {
    document.body.style.overflow = "visible";
    setDisply(!disply);
  };

  let handleLogSignMod = () => {
    lgSgnModHandler();
    setDisply(false);
  };
  let handleLogOutUser = () => {
    dispatch(logoutUser());
    setDisply(false);
  };
  let fntSzMob = "2.5rem";
  let expndMoreFntSz = "1.5rem";
  if (matches414) {
    fntSzMob = "4rem";
    expndMoreFntSz = "2.5rem";
  }
  if (matches375) {
    fntSzMob = "3.5rem";
    expndMoreFntSz = "2.5rem";
  }
  if (matches360) {
    fntSzMob = "3rem";
    expndMoreFntSz = "2.5rem";
  }
  let dispatch = useDispatch();
  let alert = useAlert();
  let { user, error, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [disply, dispatch, error, alert]);
  return (
    <>
      <List
        className="icon"
        style={{ fontSize: fntSzMob }}
        onClick={() => mobListModOpen()}
      />
      <div className={disply ? "mobListModal activeList" : "mobListModal"}>
        <div className="listModSubCont">
          <Close
            className="icon"
            style={{ fontSize: fntSzMob }}
            onClick={() => mobListModClose()}
          />
          {isAuthenticated ? (
            <ul className="userOptList">
              <Link
                to={"/me"}
                className="linkToUsrProf"
                onClick={() => handleMobListOpt()}
              >
                <li className="userOptLi">
                  <img
                    src={user.avatar.url}
                    alt="img"
                    className="userAccModImgMob"
                  />{" "}
                  <span>{user.name}</span>
                </li>
              </Link>
              <li onClick={() => handleLogOutUser()} className="userOptLi">
                <ExitToApp style={{ fontSize: fntSzMob }} /> <span>logout</span>
              </li>
              <li className="userOptLi">
                <Help style={{ fontSize: fntSzMob }} /> <span>help</span>
              </li>
              <li className="userOptLi">
                <Settings style={{ fontSize: fntSzMob }} /> <span>setting</span>
              </li>
            </ul>
          ) : (
            <div className="loginSignupMob">
              <Input
                style={{ fontSize: fntSzMob }}
                onClick={() => handleLogSignMod()}
                className="loginSignUpBtn"
              />
            </div>
          )}
          <hr />
          <div className="listMainOptCont">
            <div className="mainOptTitle" onClick={() => setHoliday(!holiday)}>
              holiday <ExpandMore style={{ fontSize: expndMoreFntSz }} />
            </div>
            <ul
              className={
                holiday ? "mainOptSubOpt actvHoliday" : "mainOptSubOpt"
              }
            >
              <li className="subOptLi">travel guidelines</li>
              <li className="subOptLi">covid-19</li>
              <li className="subOptLi">honeymoon tour</li>
              <li className="subOptLi">cruse tour</li>
              <li className="subOptLi">premium tour</li>
            </ul>
          </div>
          <div className="listMainOptCont">
            <div className="mainOptTitle" onClick={() => setFlights(!flights)}>
              flights <ExpandMore style={{ fontSize: expndMoreFntSz }} />
            </div>
            <ul
              className={
                flights ? "mainOptSubOpt actvFlights" : "mainOptSubOpt"
              }
            >
              <li className="subOptLi">flight booking</li>
              <li className="subOptLi">covid-19</li>
              <li className="subOptLi">domestic flights</li>
              <li className="subOptLi">international flights</li>
              <li className="subOptLi">offers</li>
            </ul>
          </div>
          <div className="listMainOptCont">
            <div className="mainOptTitle" onClick={() => setHotels(!hotels)}>
              hotels <ExpandMore style={{ fontSize: expndMoreFntSz }} />
            </div>
            <ul
              className={hotels ? "mainOptSubOpt actvHotels" : "mainOptSubOpt"}
            >
              <li className="subOptLi">travel guidelines</li>
              <li className="subOptLi">covid-19</li>
              <li className="subOptLi">honeymoon tour</li>
              <li className="subOptLi">cruse tour</li>
              <li className="subOptLi">premium tour</li>
            </ul>
          </div>
          <div className="listMainOptCont">
            <div className="mainOptTitle" onClick={() => setForex(!forex)}>
              forex <ExpandMore style={{ fontSize: expndMoreFntSz }} />
            </div>
            <ul className={forex ? "mainOptSubOpt actvForex" : "mainOptSubOpt"}>
              <li className="subOptLi">travel guidelines</li>
              <li className="subOptLi">covid-19</li>
              <li className="subOptLi">honeymoon tour</li>
              <li className="subOptLi">cruse tour</li>
              <li className="subOptLi">premium tour</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobListModal;
