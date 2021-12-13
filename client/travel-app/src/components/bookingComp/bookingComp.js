import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import "./bookingComp.css";
// import "./bookingCompSys.css";
import NumOfGuestSel from "../dropDownModal/numOfGuest/numOfGuestSel";
import { useAlert } from "react-alert";

function Booking({ prop, properImgUrl, userAuthenticated }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);
  let history = useHistory();
  let alert = useAlert();
  let { propertyDet } = useSelector((state) => state.property);
  let bookedDate = propertyDet.bookedDates;
  let dateToDisable = [];
  let [name, setName] = useState("");
  let [numGuest, setNumGuest] = useState(1);
  let checkinDate = state[0].startDate;
  checkinDate = checkinDate.toDateString();
  let checkoutDate = state[0].endDate;
  checkoutDate = checkoutDate.toDateString();
  let [checkAvlDis, setCheckAvlDis] = useState(false);
  let [bookDatesToCal, setBookDatesToCal] = useState([]);
  let [storedDates, setStoredDates] = useState([]);
  let bookingData;

  let handleDate = () => {
    let difference = state[0].endDate - state[0].startDate;
    let midDateArr = [];
    difference = difference / (24 * 3600 * 1000);
    difference = difference - 1;
    if (difference >= 1) {
      let midDate = state[0].startDate;
      midDate = midDate.toDateString();
      for (let i = 1; i <= difference; i++) {
        let newMidDate = new Date(midDate);
        let aDateAhead = new Date(midDate);
        aDateAhead.setDate(newMidDate.getDate() + i);
        midDateArr.push(aDateAhead);
      }

      dateToDisable = [
        ...dateToDisable,
        state[0].startDate,
        ...midDateArr,
        state[0].endDate,
      ];
      bookingData = {
        ...bookingData,
        checkIn: state[0].startDate,
        checkOut: state[0].endDate,
        name: name,
        guests: numGuest,
        propertyId: prop,
        propertyImg: properImgUrl,
        disabledDates: dateToDisable,
      };
      sessionStorage.setItem("bookingInfo", JSON.stringify(bookingData));
      setBookDatesToCal([...bookDatesToCal, ...dateToDisable]);
      history.push(`/booking/payment/${prop}`);
    } else {
      alert.error("stay should be atleast of three days");
    }
  };

  useEffect(() => {
    let newArrDates = [];
    if (bookedDate) {
      bookedDate.map((elem) => newArrDates.push(new Date(elem)));
      setStoredDates([...newArrDates]);
    }
  }, [bookedDate]);
  return (
    <>
      <div className="bookingCompCont">
        <div>
          <label htmlFor="guestName" className="bookingCompLabel">
            name{" "}
          </label>
          <input
            type="text"
            id="guestName"
            name="guestName"
            className="bookingCompInp"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {propertyDet && propertyDet.guests ? (
          <NumOfGuestSel
            setNumGuest={(val) => {
              setNumGuest(val);
            }}
            properGuest={propertyDet.guests}
            numGuest={numGuest}
          />
        ) : (
          ""
        )}
        <div
          className="checkAvailDatesBtn"
          onClick={() => {
            return setCheckAvlDis(!checkAvlDis);
          }}
          id="checkAvailDatesBtn"
        >
          <div className="checkAvailCont">
            <span>check availability</span>
          </div>
          <div className="bookingDatesDisplay">
            <span>{checkinDate}</span>
            <span>{checkoutDate}</span>
          </div>
        </div>

        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          disabledDates={[...bookDatesToCal, ...storedDates]}
          direction="horizontal"
          className={checkAvlDis ? "bookingComp bookingCompAct" : "bookingComp"}
        />
        <button
          onClick={() => handleDate()}
          className="bookingBtn"
          disabled={userAuthenticated ? false : true}
        >
          book
        </button>
      </div>
    </>
  );
}

export default Booking;
