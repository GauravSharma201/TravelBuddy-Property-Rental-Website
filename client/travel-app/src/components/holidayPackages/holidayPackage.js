import React from "react";
import { Link } from "react-router-dom";
import "./holidayPackage.css";
// import "./holidayPackageSys.css";
import Slider from "../imgSlider/slider";

function HolidayPackage({ prop }) {
  let {
    path1,
    path2,
    path3,
    path4,
    path5,
    sectionID,
    sliderName,
    top,
    middle,
    bottom,
    linkAdd,
  } = prop;
  return (
    <>
      <section className="subSection" id={sectionID}>
        <div className="phuketDiv phukLeft">
          <h4>{top}</h4>
          <h1>{middle}</h1>
          <h3>{bottom}</h3>
          <Link to={linkAdd}>
            <button>explore</button>
          </Link>
        </div>
        <div className="phuketDiv phukRight">
          <Slider
            ID={{
              s1: `${sliderName}S1`,
              s2: `${sliderName}S2`,
              s3: `${sliderName}S3`,
              s4: `${sliderName}S4`,
              s5: `${sliderName}S5`,
              i1: path1,
              i2: path2,
              i3: path3,
              i4: path4,
              i5: path5,
            }}
          />
        </div>
      </section>
    </>
  );
}

export default HolidayPackage;
