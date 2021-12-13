import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./filter.css";
// import "./filterSys.css";
import Slider from "@material-ui/core/Slider";
import { useMediaQuery } from "@material-ui/core";
import { getAllProperties } from "../../action/propertiesAction";
import { makeStyles } from "@material-ui/styles";
import { ArrowForwardIos } from "@material-ui/icons";

const iconStyle = makeStyles({
  arrowForIcon: {
    float: "right",
  },
});
function Filter({ country, id }) {
  let [priceFiltOn, setPriceFiltOn] = useState(false);
  let [filtOn, setFiltOn] = useState(false);
  let styleClasses = iconStyle();
  let [roomFiltOn, setRoomFiltOn] = useState(false);
  let [price, setPrice] = useState([1000, 30000]);
  let [ratings, setRatings] = useState(0);
  let [room, setRoom] = useState(1);
  let dispatch = useDispatch();
  let priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches375 = useMediaQuery("(max-width:375px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1536 = useMediaQuery("(max-width:1536px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSzArr = ".7rem";
  if (matches1920) {
    fntSzArr = "1.2rem";
  }
  if (matches1536) {
    fntSzArr = "1rem";
  }
  if (matches1366) {
    fntSzArr = ".8rem";
  }
  if (matches414) {
    fntSzArr = "1.5rem";
  }
  if (matches375) {
    fntSzArr = "1.2rem";
  }
  if (matches360) {
    fntSzArr = "1rem";
  }
  useEffect(() => {
    if (country) {
      dispatch(getAllProperties("", null, ratings, price, null, room, country));
    }
  }, [dispatch, price, room, ratings, country]);
  return (
    <div>
      <ul className="filterList">
        <li>
          <span
            className="filterTitle"
            onClick={() => setPriceFiltOn(!priceFiltOn)}
          >
            price
          </span>
          <br />
          <div
            className={
              priceFiltOn ? "priceFiltModal activeFiltModal" : "priceFiltModal"
            }
          >
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={1000}
              max={30000}
            />
            <div className="priceSlidValCont">
              <input
                type="text"
                value={price[0]}
                onChange={(e) => setPrice([e.target.value, 30000])}
              />
              <input
                type="text"
                value={price[1]}
                onChange={(e) => setPrice([1000, e.target.value])}
              />
            </div>
          </div>
        </li>
        <li>
          <span className="filterTitle" onClick={() => setFiltOn(!filtOn)}>
            ratings
          </span>
          <br />
          <div
            className={
              filtOn
                ? "ratingsFiltModal activeRatingsFiltModal"
                : "ratingsFiltModal"
            }
          >
            <ul className="ratingsList">
              <li onClick={() => setRatings(1)}>
                <ArrowForwardIos
                  className={styleClasses.arrowForIcon}
                  style={{ fontSize: fntSzArr }}
                />
                1
              </li>
              <li onClick={() => setRatings(2)}>
                <ArrowForwardIos
                  className={styleClasses.arrowForIcon}
                  style={{ fontSize: fntSzArr }}
                />
                2
              </li>
              <li onClick={() => setRatings(3)}>
                <ArrowForwardIos
                  className={styleClasses.arrowForIcon}
                  style={{ fontSize: fntSzArr }}
                />
                3
              </li>
              <li onClick={() => setRatings(4)}>
                <ArrowForwardIos
                  className={styleClasses.arrowForIcon}
                  style={{ fontSize: fntSzArr }}
                />
                4
              </li>
            </ul>
          </div>
        </li>
        <li>
          <span
            className="filterTitle"
            onClick={() => setRoomFiltOn(!roomFiltOn)}
          >
            room
          </span>
          <br />
          <div
            className={
              roomFiltOn
                ? "ratingsFiltModal activeRatingsFiltModal"
                : "ratingsFiltModal"
            }
          >
            <ul className="ratingsList">
              <li
                onClick={() => {
                  return setRoom(1);
                }}
              >
                1
              </li>
              <li onClick={() => setRoom(2)}>2</li>
              <li onClick={() => setRoom(3)}>3</li>
              <li onClick={() => setRoom(4)}>4</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
