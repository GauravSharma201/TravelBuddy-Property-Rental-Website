import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createBookingAct, clearBookingErrAct } from "../../action/bookingAct";
import { useAlert } from "react-alert";
import "./bookingPayment.css";
// import "./bookingPaymentSys.css";
import { CreditCard, Event, VpnKey } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { getPropertyDetails } from "../../action/propertiesAction";
import { useMediaQuery } from "@material-ui/core";

let ratingOpt = {
  size: "medium",
  value: 0,
  readOnly: true,
  precision: 0.5,
};
function BookingPayment({ match }) {
  let [phoneNum, setPhoneNum] = useState("");
  let [ratingOptComp, setRatingOptComp] = useState(ratingOpt);
  let sessionData = JSON.parse(sessionStorage.getItem("bookingInfo"));
  let alert = useAlert();
  let dispatch = useDispatch();
  let { propertyDet } = useSelector((state) => state.property);
  let { user } = useSelector((state) => state.user);
  let numOfDays = sessionData.disabledDates.length;
  let totalPrice = sessionData.guests * (propertyDet.price * numOfDays);
  let { bookingErr, bookingSuccess } = useSelector((state) => state.bookings);
  let payBtn = useRef(null);
  let stripe = useStripe();
  let elements = useElements();
  let matches375 = useMediaQuery("(max-width:375px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1536 = useMediaQuery("(max-width:1536px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let stripeElemFntSz = "1rem";
  let materialIconFntSz = "1.5rem";
  let ratingFntSz = "1.5rem";
  if (matches1920) {
    stripeElemFntSz = "1.6rem";
    materialIconFntSz = "2rem";
    ratingFntSz = "1.9rem";
  }
  if (matches1536) {
    stripeElemFntSz = "1.5rem";
    materialIconFntSz = "2rem";
    ratingFntSz = "1.9rem";
  }
  if (matches1366) {
    stripeElemFntSz = "1.2rem";
    materialIconFntSz = "1.5rem";
    ratingFntSz = "1.4rem";
  }
  if (matches414) {
    stripeElemFntSz = "2rem";
    materialIconFntSz = "1.8rem";
    ratingFntSz = "1.4rem";
  }
  if (matches375) {
    stripeElemFntSz = "2rem";
    materialIconFntSz = "2rem";
    ratingFntSz = "1.9rem";
  }
  let cardNumberOpt = {
    style: {
      base: {
        fontSize: stripeElemFntSz,
        color: "black",
      },
    },
  };
  let paymentData = {
    amount: Math.round(totalPrice * 100),
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    let myForm = {
      checkIn: sessionData.checkIn,
      checkOut: sessionData.checkOut,
      guests: sessionData.guests,
      name: sessionData.name,
      phoneNumber: phoneNum,
      propertyId: sessionData.propertyId,
      propertyImg: sessionData.propertyImg,
      disabledDates: sessionData.disabledDates,
      totalPrice: totalPrice,
    };

    try {
      let config = { headers: { "Content-Type": "application/json" } };
      let { data } = await axios.post("/payment/process", paymentData, config);
      let client_secret = data.client_secret;
      if (!stripe || !elements || !user) return;
      let result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: sessionData.name,
            phone: phoneNum,
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (
          result.paymentIntent &&
          result.paymentIntent.status === "succeeded"
        ) {
          myForm.paymentId = result.paymentIntent.id;
          myForm.paymentStatus = result.paymentIntent.status;

          dispatch(createBookingAct(myForm));
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.message);
    }
  };
  useEffect(() => {
    if (bookingErr) {
      alert.error(bookingErr);
      dispatch(clearBookingErrAct());
    }
    if (bookingSuccess) {
      alert.success("payment successfull !");
    }
    if (propertyDet.ratings) {
      let ratingOpt = {
        size: "medium",
        value: propertyDet.ratings,
        readOnly: true,
        precision: 0.5,
      };
      setRatingOptComp(ratingOpt);
    }
    dispatch(getPropertyDetails(match.params.id));
  }, [alert, bookingErr, dispatch, match, bookingSuccess, propertyDet.ratings]);
  return (
    <section className="bookingPaymentSec">
      <div className="bookingPaymentSubCont">
        <div>
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="confirmPayCont"
          >
            <label htmlFor="phoneNumber">add your phone number</label>
            <input
              type="tel"
              required
              value={phoneNum}
              name="phoneNumber"
              id="phoneNumber"
              minLength="10"
              maxLength="10"
              onChange={(e) => setPhoneNum(e.target.value)}
            />
            <div className="paymentCardInput">
              <CreditCard style={{ fontSize: materialIconFntSz }} />
              <CardNumberElement
                className="paymentInput"
                options={cardNumberOpt}
              />
            </div>
            <div className="paymentCardInput">
              <Event style={{ fontSize: materialIconFntSz }} />
              <CardExpiryElement
                className="paymentInput"
                options={cardNumberOpt}
              />
            </div>
            <div className="paymentCardInput">
              <VpnKey style={{ fontSize: materialIconFntSz }} />
              <CardCvcElement
                className="paymentInput"
                options={cardNumberOpt}
              />
            </div>
            <button type="submit" className="payNowBtn" ref={payBtn}>
              pay now
            </button>
          </form>
        </div>
      </div>
      <div className="bookingPaymentSubCont">
        {propertyDet ? (
          <div className="propDetPricingCont">
            <div className="propDetForBooking">
              <Link
                to={`/property/${propertyDet._id}`}
                className="bookingDetLink"
              >
                <div className="propDetBookImgCont">
                  <img
                    src={propertyDet.images ? propertyDet.images[0].url : ""}
                    alt="phuket"
                    className="propDetBookItemImg"
                  />
                </div>
                <div className="propDetBookDetCont">
                  <div className="propDetBookDetTop">
                    <div className="propDetBookDetTopSub">
                      <h4>{propertyDet.shortDescription}</h4>
                      <h1>{propertyDet.title}</h1>
                    </div>
                  </div>
                  <div className="propDetBookDetMidlle">
                    {propertyDet.amenities ? (
                      <>
                        <span
                          className={
                            propertyDet.amenities.ac.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.ac.name}`}
                        >
                          {propertyDet.amenities.ac.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.swimming.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.swimming.name}`}
                        >
                          {propertyDet.amenities.swimming.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.jaccozi.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.jaccozi.name}`}
                        >
                          {propertyDet.amenities.jaccozi.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.parking.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.parking.name}`}
                        >
                          {propertyDet.amenities.parking.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.wifi.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.wifi.name}`}
                        >
                          {propertyDet.amenities.wifi.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.tv.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.tv.name}`}
                        >
                          {propertyDet.amenities.tv.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.food.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.food.name}`}
                        >
                          {propertyDet.amenities.food.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.bar.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.bar.name}`}
                        >
                          {propertyDet.amenities.bar.name}
                        </span>
                        <span
                          className={
                            propertyDet.amenities.gym.value
                              ? "darkSpanBoxBookPay spanBoxBookPay"
                              : "spanBox"
                          }
                          key={`propDetBook${propertyDet.amenities.gym.name}`}
                        >
                          {propertyDet.amenities.gym.name}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="propDetBookDetBottom">
                    <div>
                      <Rating
                        {...ratingOptComp}
                        style={{ fontSize: ratingFntSz }}
                      />
                    </div>
                    <div> ₹{propertyDet.price}</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="pricingDet">
              <div className="pricingDetSub">
                <span>{`${propertyDet.price}*${numOfDays}Days`}</span>
                <span className="rigthSpan">
                  ₹{propertyDet.price * numOfDays}
                </span>
              </div>
              <div className="pricingDetSub middlePricingDetSub">
                <span>{`${sessionData.guests}guests`}</span>
                <span className="rigthSpan">
                  ₹{propertyDet.price * numOfDays * sessionData.guests}
                </span>
              </div>
              <div className="pricingDetSub">
                <span>totalPrice</span>
                <span className="rigthSpan"> ₹{totalPrice}</span>
              </div>
            </div>
          </div>
        ) : (
          "loading"
        )}
      </div>
    </section>
  );
}

export default BookingPayment;
