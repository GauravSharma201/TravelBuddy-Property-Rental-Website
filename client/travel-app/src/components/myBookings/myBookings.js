import React from "react";
import "./myBookings.css";
// import "./myBookingsSys.css";

function MyBookings({ prop }) {
  return (
    <>
      <div className="mybookingsCont">
        <div className="imgDateSec">
          <img src={prop.propertyImg} alt="phuket" className="imgMyBook" />
          <span className="dateMyBook">{prop.created_At}</span>
        </div>
        <div className="myBookingsDetSec">
          <div className="detSubMyBook">
            <span className="checkInMyBook">checkIn</span>
            <span className="checkOutMyBook">{prop.checkIn}</span>
          </div>
          <div className="detSubMyBook">
            <span className="checkInMyBook">checkOut</span>
            <span className="checkOutMyBook">{prop.checkOut}</span>
          </div>
          <div className="detSubMyBook">
            <span className="nameMyBook nameAttri">name: </span>
            <span className="nameMyBook">{prop.name}</span>
            <span className="guestsMyBook">{prop.guests} </span>
            <span className="guestAttri">guests:</span>
          </div>
          <div className="detSubMyBook">
            <span className="priceMyBook">price: </span>
            <span className="guestsMyBook">₹{prop.totalPrice}</span>
            {/* <button className="guestsMyBook">cancel booking</button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBookings;
