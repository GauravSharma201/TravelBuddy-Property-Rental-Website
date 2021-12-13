import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { ArrowForwardIos } from "@material-ui/icons";
import "./dropDownMod.css";
// import "./dropDownModSys.css";

const iconStyle = makeStyles({
  arrowForIcon: {
    float: "right",
  },
});
function DropDownMod({ title, liArr, fntSz, modContID, titleContID }) {
  let [modal, setModal] = useState(false);
  let styleClasses = iconStyle();
  let modalCont = document.getElementById(modContID);
  let titleCont = document.getElementById(titleContID);

  useEffect(() => {
    let handler = (event) => {
      if (event.target !== modalCont && event.target !== titleCont) {
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [modalCont, titleCont]);
  return (
    <>
      <div>
        <div
          className="dropDownModTitle"
          onClick={() => {
            return setModal(!modal);
          }}
          id={titleContID}
        >
          {title}
        </div>
        <div
          className={modal ? "dropDownMod activeDropDownMod" : "dropDownMod"}
          id={modContID}
        >
          <ul>
            {liArr.map((elem, index) => {
              return (
                <li className="dropDownModLi" key={`${modContID}Opt${index}`}>
                  {elem}{" "}
                  <ArrowForwardIos
                    className={styleClasses.arrowForIcon}
                    style={{ fontSize: fntSz }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DropDownMod;
