import React from "react";
import "./cartItem.css";
// import "./cartItemSys.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Rating } from "@material-ui/lab";
import { removeCartItem } from "../../action/cartAction";
import { useMediaQuery } from "@material-ui/core";

function CartItem({ prop }) {
  let dispatch = useDispatch();
  let handleCartRem = (prop) => {
    dispatch(removeCartItem(prop.product));
  };
  let ratingOpt = {
    size: "medium",
    value: prop.rating,
    readOnly: true,
    precision: 0.5,
  };
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let fntSz = "1.5rem";
  if (matches414) {
    fntSz = "2rem";
  }
  if (matches1920) {
    fntSz = "2rem";
  }
  return (
    <>
      <div className="cartItem">
        <Link to={`/property/${prop.product}`} className="cartLink">
          <div className="cartItemImgCont">
            <img
              src={prop.image ? prop.image.url : ""}
              alt="phuket"
              className="cartItemImg"
            />
          </div>
          <div className="cartItemDetCont">
            <div className="cartItemDetTop">
              <div className="cartItemDetTopSub">
                <h4>{prop.shortDescription}</h4>
                <h1>{prop.title}</h1>
              </div>
            </div>
            {prop.amenities ? (
              <div className="cartItemDetMidlle">
                <span
                  className={
                    prop.amenities.ac.value ? "spanBox darkSpanBox" : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.ac.name}`}
                >
                  {prop.amenities.ac.name}
                </span>
                <span
                  className={
                    prop.amenities.swimming.value
                      ? "spanBox darkSpanBox"
                      : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.swimming.name}`}
                >
                  {prop.amenities.swimming.name}
                </span>
                <span
                  className={
                    prop.amenities.jaccozi.value
                      ? "spanBox darkSpanBox"
                      : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.jaccozi.name}`}
                >
                  {prop.amenities.jaccozi.name}
                </span>
                <span
                  className={
                    prop.amenities.parking.value
                      ? "spanBox darkSpanBox"
                      : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.parking.name}`}
                >
                  {prop.amenities.parking.name}
                </span>
                <span
                  className={
                    prop.amenities.wifi.value
                      ? "spanBox darkSpanBox"
                      : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.wifi.name}`}
                >
                  {prop.amenities.wifi.name}
                </span>
                <span
                  className={
                    prop.amenities.tv.value ? "spanBox darkSpanBox" : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.tv.name}`}
                >
                  {prop.amenities.tv.name}
                </span>
                <span
                  className={
                    prop.amenities.food.value
                      ? "spanBox darkSpanBox"
                      : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.food.name}`}
                >
                  {prop.amenities.food.name}
                </span>
                <span
                  className={
                    prop.amenities.bar.value ? "spanBox darkSpanBox" : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.bar.name}`}
                >
                  {prop.amenities.bar.name}
                </span>
                <span
                  className={
                    prop.amenities.gym.value ? "spanBox darkSpanBox" : "spanBox"
                  }
                  key={`cartAmen${prop.amenities.gym.name}`}
                >
                  {prop.amenities.gym.name}
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="cartItemDetBottom">
              <div>
                <Rating {...ratingOpt} style={{ fontSize: fntSz }} />
              </div>
              <div>₹{prop.price}</div>
            </div>
          </div>
        </Link>
        <div className="cartItemDelButCont">
          <button
            className="removeButtonCart"
            onClick={() => handleCartRem(prop)}
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
