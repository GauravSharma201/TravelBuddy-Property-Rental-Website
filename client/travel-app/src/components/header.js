import React, { useEffect, useRef } from "react";
import { ShoppingCart, Input, Close } from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import "./header.css";
// import "./headerSys.css";
import logo from "../images/home/travelbuddy_logo.png";
import LoginForm from "./loginForm/loginForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAccModal from "./userAccountButton/userAccModal";
import ForgotPassword from "./forgotPassword/forgotPassword";
import RegisterForm from "./registerForm/registerForm";
import DropDownMod from "./dropDownModal/dropDownMod";
import MobListModal from "./mobileListModal/mobListModal";

function Header() {
  //  material-ui beakpoints start
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches375 = useMediaQuery("(max-width:375px)");
  //  material-ui beakpoints end
  let { isAuthenticated } = useSelector((state) => state.user);
  let loginFormModal = useRef(null);
  let forgotPassModal = useRef(null);
  let registerModal = useRef(null);
  let fntSzMob = "1.5rem";
  let fntSzgRgFrgt = "2em";
  let inputFntSz = "1.5rem";
  if (matches1920) {
    fntSzMob = "2.3rem";
    inputFntSz = "2.3rem";
  }
  if (matches1366) {
    fntSzMob = "1.5rem";
    inputFntSz = "1.5rem";
  }
  if (matches414) {
    fntSzMob = "3.5rem";
  }
  if (matches375) {
    fntSzMob = "3rem";
    fntSzgRgFrgt = "3.5rem";
  }
  if (matches360) {
    fntSzMob = "2.5rem";
  }
  let handleModal = () => {
    let modal = document.getElementById("modal");
    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
  };
  let handleClose = () => {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    document.body.style.overflow = "visible";
    loginFormModal.current.style.display = "block";
    registerModal.current.style.display = "none";
    forgotPassModal.current.style.display = "none";
  };
  let handleForgotPassModal = () => {
    loginFormModal.current.style.display = "none";
    registerModal.current.style.display = "none";
    forgotPassModal.current.style.display = "block";
  };
  let handleRegisterModal = () => {
    loginFormModal.current.style.display = "none";
    registerModal.current.style.display = "block";
    forgotPassModal.current.style.display = "none";
  };
  let handleLoginModal = () => {
    loginFormModal.current.style.display = "block";
    registerModal.current.style.display = "none";
    forgotPassModal.current.style.display = "none";
  };
  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated]);
  return (
    <>
      <div id="header">
        <div id="left">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" id="logo" />
            </Link>
          </div>
        </div>
        <div id="center">
          <div id="top">
            <input type="text" placeholder="search" />
            <button className="btn">search</button>
          </div>
          <div id="bottom">
            <ul id="options">
              <li>
                <DropDownMod
                  title={"holiday"}
                  liArr={[
                    "travel guidelines",
                    "covid-19",
                    "honeymoon tour",
                    "cruse tour",
                    "premium tour",
                  ]}
                  fntSz={"1em"}
                  modContID={"holidayId"}
                  titleContID={"holidayTitID"}
                />
              </li>
              <li>
                <DropDownMod
                  title={"flight"}
                  liArr={[
                    "flight booking",
                    "covid-19",
                    "domestic flights",
                    "international flights",
                    "offers",
                  ]}
                  fntSz={"1em"}
                  modContID={"flightId"}
                  titleContID={"flightTitID"}
                />
              </li>
              <li>
                <DropDownMod
                  title={"hotels"}
                  liArr={[
                    "travel guidelines",
                    "covid-19",
                    "honeymoon tour",
                    "cruse tour",
                    "premium tour",
                  ]}
                  fntSz={"1em"}
                  modContID={"hotelsId"}
                  titleContID={"hotelsTitID"}
                />
              </li>
              <li>
                <DropDownMod
                  title={"forex"}
                  liArr={[
                    "travel guidelines",
                    "covid-19",
                    "honeymoon tour",
                    "cruse tour",
                    "premium tour",
                  ]}
                  fntSz={"1em"}
                  modContID={"forexId"}
                  titleContID={"forexTitID"}
                />
              </li>
            </ul>
          </div>
        </div>
        <div id="right">
          {matches360 || matches414 ? (
            <>
              <Link to={"/cart"} className="linkCss">
                <ShoppingCart className="icon" style={{ fontSize: fntSzMob }} />
              </Link>
              <MobListModal
                lgSgnModHandler={() => {
                  let modal = document.getElementById("modal");
                  modal.style.display = "flex";
                }}
              />
            </>
          ) : (
            <>
              <Link to={"/cart"} className="linkCss">
                <ShoppingCart className="icon" style={{ fontSize: fntSzMob }} />
              </Link>
              {isAuthenticated ? (
                <>
                  <UserAccModal />
                </>
              ) : (
                <Input
                  className="icon"
                  style={{ fontSize: inputFntSz }}
                  onClick={() => handleModal()}
                />
              )}
            </>
          )}
        </div>
        <div id="modal">
          <div id="loginForm" ref={loginFormModal}>
            <Close
              onClick={() => handleClose()}
              className="closeBtn"
              style={{ fontSize: fntSzgRgFrgt }}
            />
            <LoginForm />
            <div className="userOptions">
              <span onClick={() => handleForgotPassModal()}>
                forgot Password?
              </span>
              <span onClick={() => handleRegisterModal()}>Register</span>
            </div>
          </div>
          <div className="forgotPasswordForm" ref={forgotPassModal}>
            <Close
              onClick={() => handleClose()}
              className="closeBtn"
              style={{ fontSize: fntSzgRgFrgt }}
            />
            <ForgotPassword />
            <div className="userOptions">
              <span onClick={() => handleLoginModal()}>login</span>
              <span onClick={() => handleRegisterModal()}>Register</span>
            </div>
          </div>
          <div className="registerForm" ref={registerModal}>
            <Close
              onClick={() => handleClose()}
              className="closeBtn"
              style={{ fontSize: fntSzgRgFrgt }}
            />
            <RegisterForm />
            <div className="userOptionsReg">
              <span onClick={() => handleForgotPassModal()}>
                forgot Password?
              </span>
              <span onClick={() => handleLoginModal()}>login</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
