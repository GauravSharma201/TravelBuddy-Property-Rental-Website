import React, { useState } from "react";
import { Rating } from "@material-ui/lab";
import "./reviewCard.css";
// import "./reviewCardSys.css";
import { useMediaQuery } from "@material-ui/core";

function ReviewCard({ prop }) {
  let [modal, setModal] = useState(true);
  let matches375 = useMediaQuery("(max-width:375px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1536 = useMediaQuery("(max-width:1536px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSz = "1.5rem";
  if (matches1920) {
    fntSz = "2rem";
  }
  if (matches1536) {
    fntSz = "1.6rem";
  }
  if (matches1366) {
    fntSz = "1.3rem";
  }
  if (matches375) {
    fntSz = "2rem";
  }
  let ratingOpt = {
    size: "medium",
    value: prop.rating,
    readOnly: true,
    precision: 0.5,
  };
  let handleShowComment = () => {
    setModal(!modal);
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  };
  return (
    <>
      <div className="reviewCardCont">
        <div className="reviewCard">
          <div className="revTopSec">
            <div className="firstRowTopSec">
              <span>{prop.name}</span>
              <img src={prop.image} alt="img" />
            </div>
            <div className="secRowTopSec">
              <span>{prop.creation_Date}</span>
            </div>
          </div>
          <div className="revBotSec">
            <div className="firstRowBotSec">
              <Rating {...ratingOpt} style={{ fontSize: fntSz }} />
            </div>
            <div className="secRowBotSec">{prop.comment}</div>
          </div>
          <button className="showMoreBtn" onClick={() => handleShowComment()}>
            show more...
          </button>
        </div>
      </div>
      <div
        className={!modal ? "commentModal actvCommentModal" : "commentModal"}
      >
        <div className="closeCommntModal" onClick={() => handleShowComment()}>
          <div className="cmntMdlRevCrd">
            <div className="revTopSec">
              <div className="firstRowTopSec">
                <span>{prop.name}</span>
                <img src={prop.image} alt="img" />
              </div>
              <div className="secRowTopSec">
                <span>{prop.creation_Date}</span>
              </div>
            </div>
            <div className="cmntMdlBotSec">
              <div className="firstRowBotSec">
                <Rating {...ratingOpt} />
              </div>
              <div className="cmntMdlBotSecSecRow">{prop.comment}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
