import React, { useEffect, useState } from "react";
import "./rentalPropAmenities.css";
import {
  AcUnit,
  Pool,
  FitnessCenter,
  LocalBar,
  Kitchen,
  Tv,
  HotTub,
  Wifi,
  LocalParking,
} from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";

function RentalPropAmenities({
  acSet,
  swimSet,
  jaczSet,
  tvSet,
  foodSet,
  parkSet,
  barSet,
  wifiSet,
  gymSet,
  amenVal,
}) {
  let [inputVal, setInputVal] = useState(null);
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSz = "1.5rem";
  if (matches1920) {
    fntSz = "2rem";
  }
  if (matches1366) {
    fntSz = "1.8rem";
  }
  if (matches414) {
    fntSz = "2.5rem";
  }
  useEffect(() => {
    let inputVal = JSON.parse(amenVal);
    setInputVal(inputVal);
    console.log("this is amenities from outside", inputVal);
  }, [amenVal]);
  return (
    <>
      <div className="AmenRentalPropCont">
        {/* {inputVal&&<> */}
        <div className="rentalAmenColumn">
          <div
            onClick={() => acSet()}
            className={
              inputVal && inputVal.ac.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <AcUnit style={{ fontSize: fntSz }} />
            ac
          </div>
          <div
            onClick={() => swimSet()}
            className={
              inputVal && inputVal.swimming.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <Pool style={{ fontSize: fntSz }} />
            swimming
          </div>
          <div
            onClick={() => gymSet()}
            className={
              inputVal && inputVal.gym.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <FitnessCenter style={{ fontSize: fntSz }} />
            gym
          </div>
        </div>
        <div className="rentalAmenColumn">
          <div
            onClick={() => barSet()}
            className={
              inputVal && inputVal.bar.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <LocalBar style={{ fontSize: fntSz }} />
            bar
          </div>
          <div
            onClick={() => foodSet()}
            className={
              inputVal && inputVal.food.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <Kitchen style={{ fontSize: fntSz }} />
            food
          </div>
          <div
            onClick={() => tvSet()}
            className={
              inputVal && inputVal.tv.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <Tv style={{ fontSize: fntSz }} />
            tv
          </div>
        </div>
        <div className="rentalAmenColumn">
          <div
            onClick={() => jaczSet()}
            className={
              inputVal && inputVal.jacoozi.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <HotTub style={{ fontSize: fntSz }} />
            jacoozi
          </div>
          <div
            onClick={() => parkSet()}
            className={
              inputVal && inputVal.wifi.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <Wifi style={{ fontSize: fntSz }} />
            wifi
          </div>
          <div
            onClick={() => wifiSet()}
            className={
              inputVal && inputVal.parking.value
                ? "rentalAmenColSubDiv actvAmen"
                : "rentalAmenColSubDiv"
            }
          >
            <LocalParking style={{ fontSize: fntSz }} />
            parking
          </div>
        </div>
        {/* </>} */}
      </div>
    </>
  );
}

export default RentalPropAmenities;
