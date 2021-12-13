import React, { useEffect, useState } from "react";
import "./propertyDetail.css";
// import "./propertyDetailSys.css";
import {
  getPropertyDetails,
  createReivew,
  clearError,
} from "../../action/propertiesAction";
import {
  Favorite,
  AcUnit,
  Pool,
  FitnessCenter,
  LocalBar,
  Kitchen,
  Tv,
  HotTub,
  Wifi,
  LocalParking,
  Close,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useAlert } from "react-alert";
import ReviewCard from "../reviewCard/reviewCard";
import { Rating } from "@material-ui/lab";
import { addToCartAct } from "../../action/cartAction";
import Booking from "../bookingComp/bookingComp";
import { useMediaQuery } from "@material-ui/core";

let ratingOpt = {
  size: "medium",
  value: 0,
  readOnly: true,
  precision: 0.5,
  name: "comment-rating4",
};
function PropertyDetail({ match }) {
  let dispatch = useDispatch();
  let alert = useAlert();
  let properToBooking = match.params.id;
  let [comments, setComments] = useState("");
  let [descpModl, setDescpModl] = useState(false);
  let [imagesModl, setImagesModl] = useState(false);
  let [ratings, setRatings] = useState(0);
  let [ratingCompOpt, setRatingCompOpt] = useState(ratingOpt);
  let { error, propertyDet } = useSelector((state) => state.property);
  let { isAuthenticated, user } = useSelector((state) => state.user);
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1536 = useMediaQuery("(max-width:1536px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSz = "1.5rem";
  let fntSzRating = "1.5rem";
  if (matches1920) {
    fntSz = "2rem";
    fntSzRating = "2rem";
  }
  if (matches1536) {
    fntSz = "2rem";
    fntSzRating = "1.7rem";
  }
  if (matches1366) {
    fntSz = "1.5rem";
    fntSzRating = "1.2rem";
  }
  if (matches414) {
    fntSzRating = "1.8rem";
  }
  if (matches360) {
    fntSz = "2.5rem";
    fntSzRating = "2.5rem";
  }
  let { createdReview } = useSelector((state) => state.createdRev);
  let handleComments = (e) => {
    let value = e.target.value;
    setComments(value);
  };

  let handleSubmit = () => {
    let commentData = {
      rating: ratings,
      comment: comments,
      propertyId: match.params.id,
    };
    dispatch(createReivew(commentData));
  };
  let handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCartAct(match.params.id));
    } else {
      alert.error("login to add items to cart");
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (propertyDet.ratings) {
      let ratingOpt = {
        size: "medium",
        value: propertyDet.ratings,
        readOnly: true,
        precision: 0.5,
        name: "comment-rating3",
      };
      setRatingCompOpt(ratingOpt);
    }
    if (descpModl) {
      document.body.style.overflow = "hidden";
    } else if (!descpModl) {
      document.body.style.overflow = "visible";
    }

    if (imagesModl) {
      document.body.style.overflow = "hidden";
    } else if (!imagesModl && !descpModl) {
      document.body.style.overflow = "visible";
    }
    dispatch(getPropertyDetails(match.params.id));
  }, [
    dispatch,
    match.params.id,
    error,
    alert,
    propertyDet.ratings,
    descpModl,
    imagesModl,
  ]);
  return (
    <section className="propertyDetail">
      {propertyDet ? (
        <>
          <div className="topSection">
            <div className="titleContainer">
              <h1>{propertyDet.title}</h1>
              <div className="properStats">
                <div className="statsCont">
                  <Rating {...ratingCompOpt} />
                  <span>({propertyDet.numOfReviews} reviews)</span>
                  <span>
                    {propertyDet.city}.{propertyDet.state}.{propertyDet.country}
                  </span>
                </div>
                <div
                  className="addToCartCont"
                  onClick={() => handleAddToCart()}
                >
                  <Favorite
                    className="addToCartBtn"
                    style={{ fontSize: "1.4rem", color: "red" }}
                  />
                  save
                </div>
              </div>
            </div>
            <div
              className={
                imagesModl
                  ? "showImagesModal actvShowImgMdl"
                  : "showImagesModal"
              }
            >
              <div className="showImgsMdlSub">
                <Close
                  className="closeShowImgBtn"
                  style={{ fontSize: "2rem" }}
                  onClick={() => setImagesModl(!imagesModl)}
                />
                {propertyDet.images ? (
                  <>
                    <Carousel className="showImagesCarousel">
                      {propertyDet.images.map((elem, index) => {
                        return (
                          <img
                            src={elem.url}
                            alt="property"
                            key={`showImgsMdlImage${index}`}
                          />
                        );
                      })}
                      {/* <img src={propertyDet.images[0].url} alt="property" />
                      <img src={propertyDet.images[1].url} alt="property" />
                      <img src={propertyDet.images[2].url} alt="property" />
                      <img src={propertyDet.images[3].url} alt="property" />
                      <img src={propertyDet.images[4].url} alt="property" /> */}
                    </Carousel>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="imagesCont">
              {propertyDet.images ? (
                <>
                  {" "}
                  <div className="singleImageCont">
                    <img src={propertyDet.images[0].url} alt="property" />
                  </div>
                  <div className="multImagesCont">
                    <div>
                      <img src={propertyDet.images[1].url} alt="property" />
                    </div>
                    <div>
                      <img src={propertyDet.images[2].url} alt="property" />
                    </div>
                    <div>
                      <img src={propertyDet.images[3].url} alt="property" />
                    </div>
                    <div>
                      <img src={propertyDet.images[4].url} alt="property" />
                    </div>
                  </div>
                  <button
                    className="showImagesBtn"
                    onClick={() => setImagesModl(!imagesModl)}
                  >
                    show Images...
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div
            className={
              descpModl ? "descriptionModal actvDescpMod" : "descriptionModal"
            }
          >
            <div
              className="descriptionMod"
              onClick={() => setDescpModl(!descpModl)}
            >
              <div className="properDescripMod">
                <h1>About this place</h1>
                <div className="modalDescpDiv">{propertyDet.description}</div>
              </div>
            </div>
          </div>
          <div className="middleSection">
            <div className="detailSection">
              <div className="hostedByCont">
                <h1>this Property is hosted By {propertyDet.hostName}</h1>
                <p>{propertyDet.shortDescription}</p>
                <img src={propertyDet.hostImage} alt="hostProp" />
              </div>
              <div className="properDescrip">
                <h1>About this place</h1>
                <div>{propertyDet.description}</div>
                <button
                  className="showMoreDesBtn"
                  onClick={() => setDescpModl(!descpModl)}
                >
                  show more...
                </button>
              </div>
              <div className="properAmenties">
                {propertyDet.amenities ? (
                  <div className="AmenitiesContainer">
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.ac.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <AcUnit style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.ac.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.wifi.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <Wifi style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.wifi.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.swimming.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <Pool style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.swimming.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.jaccozi.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <HotTub style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.jaccozi.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.parking.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <LocalParking style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.parking.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.food.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <Kitchen style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.food.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.tv.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <Tv style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.tv.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.bar.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <LocalBar style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.bar.name}
                      </div>
                    </div>
                    <div className="amenitiesContSub">
                      <div
                        className={
                          propertyDet.amenities.gym.value
                            ? "amenDiv actvAmenDiv"
                            : "amenDiv"
                        }
                      >
                        <FitnessCenter style={{ fontSize: fntSz }} />
                        {propertyDet.amenities.gym.name}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="bookingSection">
              <div className="bookingContainer">
                <div className="bookingModal">
                  {propertyDet.images ? (
                    <Booking
                      prop={properToBooking}
                      userAuthenticated={isAuthenticated}
                      properImgUrl={propertyDet.images[0].url}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bottomSection">
            <h1>Reviews</h1>
            <div className="reviewsContDis">
              <div className="reviewsCont">
                {propertyDet.reviews
                  ? propertyDet.reviews.map((elem, index) => (
                      <ReviewCard key={`${index}review`} prop={elem} />
                    ))
                  : "no reviews"}
              </div>
            </div>
            <div className="addCommentSection">
              <div className="addCommentCont">
                <div className="ratingSection">
                  <Rating
                    {...{
                      size: "medium",
                      value: ratings,
                      readOnly: false,
                      precision: 0.5,
                      name: "comment-rating2",
                    }}
                    onChange={(event, newValue) => {
                      setRatings(newValue);
                    }}
                    style={{ fontSize: fntSzRating }}
                  />
                </div>
                <div className="commentSection">
                  <textarea
                    name="comments"
                    id=""
                    cols="30"
                    rows="10"
                    value={comments}
                    onChange={(e) => handleComments(e)}
                  ></textarea>
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="submitCommentBtn"
                >
                  submit
                </button>
              </div>
              <div className="addedComment">
                {createdReview
                  ? createdReview.map((elem) =>
                      user && elem.user === user._id ? (
                        <div className="reviewCardCont">
                          <div className="reviewCard">
                            <div className="revTopSec">
                              <div className="firstRowTopSec">
                                <span>{elem.name}</span>
                                <img src={elem.image} alt="img" />
                              </div>
                              <div className="secRowTopSec">
                                <span>{elem.creation_Date}</span>
                              </div>
                            </div>
                            <div className="revBotSec">
                              <div className="firstRowBotSec">
                                <Rating
                                  {...{
                                    size: "medium",
                                    value: elem.rating,
                                    readOnly: true,
                                    precision: 0.5,
                                    name: "comment-rating1",
                                  }}
                                />
                              </div>
                              <div className="secRowBotSec">{elem.comment}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            </div>
          </div>
        </>
      ) : (
        "loading"
      )}
    </section>
  );
}

export default PropertyDetail;
