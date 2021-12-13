import React, { useEffect } from "react";
import "./rentalPropDetail.css";
// import "./rentalPropDetailSys.css";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";
function RentalPropDetail({
  onInpChange,
  propDetInpVal,
  incRoom,
  decRoom,
  incGuest,
  decGuest,
  roomVal,
  guestVal,
}) {
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSz = "1.5rem";
  if (matches1920) {
    fntSz = "2.5rem";
  }
  if (matches1366) {
    fntSz = "1.8rem";
  }
  if (matches414) {
    fntSz = "3rem";
  }
  useEffect(() => {
    console.log("this is input value from outside", propDetInpVal);
  }, [propDetInpVal]);
  return (
    <>
      <form action="" className="rentalPropDetForm">
        <input
          type="text"
          name="rentalTitle"
          required
          value={propDetInpVal.rentalTitle}
          onChange={(e) => onInpChange(e)}
          placeholder="title..."
        />
        <textarea
          name="rentalShortDes"
          id="rentalShortDes"
          required
          cols="30"
          rows="5"
          value={propDetInpVal.rentalShortDes}
          onChange={(e) => onInpChange(e)}
          placeholder="short Description..."
          className="shortDescpPropDet"
        ></textarea>
        <textarea
          name="rentalDes"
          id="rentalDes"
          cols="30"
          rows="10"
          required
          value={propDetInpVal.rentalDes}
          onChange={(e) => onInpChange(e)}
          placeholder="description..."
          className="descpPropDet"
        ></textarea>
        <input
          type="number"
          name="rentalPrice"
          required
          value={propDetInpVal.rentalPrice}
          onChange={(e) => onInpChange(e)}
          placeholder="price..."
        />
        <div className="rentalRoomSelCont">
          <div className="rentalRoomSel">room</div>
          <div className="rentalRoomOpt">
            <div className="rentalRoombtn" onClick={() => incRoom()}>
              <AddCircleOutline style={{ fontSize: fntSz }} />
            </div>
            <div className="rentalRoombtnVal">{roomVal}</div>
            <div className="rentalRoombtn" onClick={() => decRoom()}>
              <RemoveCircleOutline style={{ fontSize: fntSz }} />
            </div>
          </div>
        </div>
        <div className="rentalRoomSelCont">
          <div className="rentalRoomSel">guests</div>
          <div className="rentalRoomOpt">
            <div className="rentalRoombtn" onClick={() => incGuest()}>
              <AddCircleOutline style={{ fontSize: fntSz }} />
            </div>
            <div className="rentalRoombtnVal">{guestVal}</div>
            <div className="rentalRoombtn" onClick={() => decGuest()}>
              <RemoveCircleOutline style={{ fontSize: fntSz }} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default RentalPropDetail;
