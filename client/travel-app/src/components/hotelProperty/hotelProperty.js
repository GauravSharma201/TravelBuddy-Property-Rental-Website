import React from "react";
import "./hotelProperty.css";
// import "./hotelPropertySys.css";
import Carousel from "react-material-ui-carousel";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
function Property({ prop }) {
  let ratingOpt = {
    size: "medium",
    value: prop.ratings,
    readOnly: true,
    precision: 0.5,
  };
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSzRating = "1.5rem";
  if (matches1920) {
    fntSzRating = "1.8rem";
  }
  if (matches1366) {
    fntSzRating = "1.4rem";
  }
  if (matches414) {
    fntSzRating = "1.8rem";
  }
  if (matches360) {
    fntSzRating = "2.2rem";
  }
  return (
    <>
      <div className="propertyDiv">
        <div className="hotelImage">
          <Carousel className="hotelListCarousel">
            <img src={prop.images ? prop.images[0].url : ""} alt="img" />
            <img src={prop.images ? prop.images[1].url : ""} alt="img" />
            <img src={prop.images ? prop.images[2].url : ""} alt="img" />
            <img src={prop.images ? prop.images[4].url : ""} alt="img" />
          </Carousel>
        </div>
        <div className="hotelDetails">
          <Link to={`/property/${prop._id}`} className="linkToProperty">
            <div className="detailTop">
              <div className="detailTopSub">
                <h4>{prop.shortDescription}</h4>
                <h1>{prop.title}</h1>
              </div>
            </div>
            <div className="detailMidlle">
              {/* {prop.amenities.map((elem, index) => ( */}
              <span
                key={`ameni${prop.amenities.ac.name}`}
                className={
                  prop.amenities.ac.value ? "darkSpanBox spanBox" : "spanBox"
                }
              >
                {prop.amenities.ac.name}
              </span>
              <span
                key={`ameni${prop.amenities.bar.name}`}
                className={
                  prop.amenities.bar.value ? "darkSpanBox spanBox" : "spanBox"
                }
              >
                {prop.amenities.bar.name}
              </span>
              <span
                key={`ameni${prop.amenities.food.name}`}
                className={
                  prop.amenities.food.value ? "darkSpanBox spanBox" : "spanBox"
                }
              >
                {prop.amenities.food.name}
              </span>
              <span
                key={`ameni${prop.amenities.gym.name}`}
                className={
                  prop.amenities.gym.value ? "darkSpanBox spanBox" : "spanBox"
                }
              >
                {prop.amenities.gym.name}
              </span>
              <span
                key={`ameni${prop.amenities.jaccozi.name}`}
                className={
                  prop.amenities.jaccozi.value
                    ? "darkSpanBox spanBox"
                    : "spanBox"
                }
              >
                {prop.amenities.jaccozi.name}
              </span>
              <span
                key={`ameni${prop.amenities.parking.name}`}
                className={
                  prop.amenities.parking.value
                    ? "darkSpanBox spanBox"
                    : "spanBox"
                }
              >
                {prop.amenities.parking.name}
              </span>
              <span
                key={`ameni${prop.amenities.swimming.name}`}
                className={
                  prop.amenities.swimming.value
                    ? "darkSpanBox spanBox"
                    : "spanBox"
                }
              >
                {prop.amenities.swimming.name}
              </span>
              <span
                key={`ameni${prop.amenities.tv.name}`}
                className={
                  prop.amenities.tv.value ? "darkSpanBox spanBox" : "spanBox"
                }
              >
                {prop.amenities.tv.name}
              </span>
              <span
                key={`ameni${prop.amenities.wifi.name}`}
                className={
                  prop.amenities.wifi.value ? "darkSpanBox spanBox" : "spanBox"
                }
              >
                {prop.amenities.wifi.name}
              </span>
              {/* ))} */}
            </div>
            <div className="detailBottom">
              <div>
                <Rating {...ratingOpt} style={{ fontSize: fntSzRating }} />
              </div>
              <div>₹{prop.price}</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Property;
