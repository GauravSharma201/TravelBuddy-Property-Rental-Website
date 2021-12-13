import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./editPropTesting.css";
// import "./editPropTestingSys.css";
import { useMediaQuery } from "@material-ui/core";
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
import {
  PhotoCamera,
  AddCircleOutline,
  RemoveCircleOutline,
} from "@material-ui/icons";
import {
  getPropertyDetails,
  updateMyPropAct,
  myPropUpdClearErr,
} from "../../../action/propertiesAction";
import CustomSelector from "../../customSelector/customSelector";

let initialState = {
  titleUpd: "",
  shortdesUpd: "",
  desUpd: "",
  addressUpd: "",
  priceUpd: 0,
};
let propDetCatOpt = [
  { name: "Residential Home" },
  { name: "Villa" },
  { name: "Cabin" },
  { name: "Town House" },
  { name: "Bungalow" },
];
function EditPropTesting({ match }) {
  let { propertyDet } = useSelector((state) => state.property);
  let { propUpdError, propUpdLoading, propUpdSucess } = useSelector(
    (state) => state.myPropUpdate
  );
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches375 = useMediaQuery("(max-width:375px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1536 = useMediaQuery("(max-width:1536px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSz = "1.5em";
  let fntSzCircle = "1.5rem";
  let fntSzPht = "1.5rem";
  if (matches1920) {
    fntSz = "2.3rem";
    fntSzCircle = "2.5rem";
    fntSzPht = "3rem";
  }
  if (matches1536) {
    fntSz = "2.3rem";
    fntSzCircle = "2.5rem";
    fntSzPht = "2.5rem";
  }
  if (matches1366) {
    fntSz = "1.8rem";
    fntSzCircle = "2rem";
    fntSzPht = "2rem";
  }
  if (matches414) {
    fntSz = "1.5em";
    fntSzCircle = "3.5rem";
    fntSzPht = "3rem";
  }
  if (matches375) {
    fntSz = "1.3em";
    fntSzCircle = "2.7rem";
    fntSzPht = "3rem";
  }
  if (matches360) {
    fntSz = "1.5em";
  }
  let [navVariable, setNavVariable] = useState(1);
  let [room, setRoom] = useState(1);
  let [guest, setGuest] = useState(1);
  let [category, setCategory] = useState(null);
  let [categoryPass, setCategoryPass] = useState(null);
  let [upldedImg, setUpldedImg] = useState([]);
  let [isImgUpdated, setIsImgUpdated] = useState(false);
  let [propDetInp, setPropDetInp] = useState(initialState);
  let [submit, setSubmit] = useState(false);

  // useStates for amenities selector ................. {
  let [acDis, setAcDis] = useState(false);
  let [swimDis, setSwimDis] = useState(false);
  let [jacooziDis, setJacooziDis] = useState(false);
  let [tvDis, setTvDis] = useState(false);
  let [foodDis, setFoodDis] = useState(false);
  let [parkingDis, setParkingDis] = useState(false);
  let [barDis, setBarDis] = useState(false);
  let [wifiDis, setWifiDis] = useState(false);
  let [gymDis, setGymDis] = useState(false);
  // useStates for amenities selector ................. }

  let dispatch = useDispatch();
  let alert = useAlert();
  let propertyId = match.params.id;

  let handleInputPropUpd = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (e.target.name === "priceUpd") {
      setPropDetInp({ ...propDetInp, [name]: Number(value) });
    } else {
      setPropDetInp({ ...propDetInp, [name]: value });
    }
  };
  let handleImgUpld = (e) => {
    let files = e.target.files;
    let length = files.length;

    if (e.target.files && length >= 5) {
      const files = Array.from(e.target.files);

      setUpldedImg([]);
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            let val = reader.result;
            setUpldedImg((old) => [...old, val]);
            setIsImgUpdated(true);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };
  let handleSubmit = () => {
    let amenities = {
      ac: { name: "ac", value: acDis },
      jaccozi: { name: "jacoozi", value: jacooziDis },
      parking: { name: "parking", value: wifiDis },
      bar: { name: "bar", value: barDis },
      tv: { name: "tv", value: tvDis },
      food: { name: "food", value: foodDis },
      wifi: { name: "wifi", value: parkingDis },
      swimming: { name: "swimming", value: swimDis },
      gym: { name: "gym", value: gymDis },
    };

    let propertyData = {
      title: propDetInp.titleUpd,
      address: propDetInp.addressUpd,
      amenities: amenities,
      description: propDetInp.desUpd,
      shortDescription: propDetInp.shortdesUpd,
      images: upldedImg,
      room: room,
      price: propDetInp.priceUpd,
      category: categoryPass,
      guests: guest,
    };

    dispatch(updateMyPropAct(match.params.id, propertyData));
    setSubmit(true);
  };

  useEffect(() => {
    if (propertyDet && propertyDet._id !== propertyId) {
      dispatch(getPropertyDetails(propertyId));
    } else if (propertyDet && propertyDet.amenities && propertyDet.images) {
      let initialState = {
        titleUpd: propertyDet.title,
        shortdesUpd: propertyDet.shortDescription,
        desUpd: propertyDet.description,
        addressUpd: propertyDet.address,
        priceUpd: propertyDet.price,
      };

      setPropDetInp(initialState);
      setCategoryPass(propertyDet.category);
      setUpldedImg(propertyDet.images);
      setRoom(propertyDet.room);
      setGuest(propertyDet.guests);
      setAcDis(propertyDet.amenities.ac.value);
      setSwimDis(propertyDet.amenities.swimming.value);
      setJacooziDis(propertyDet.amenities.jaccozi.value);
      setTvDis(propertyDet.amenities.tv.value);
      setFoodDis(propertyDet.amenities.food.value);
      setParkingDis(propertyDet.amenities.parking.value);
      setBarDis(propertyDet.amenities.bar.value);
      setWifiDis(propertyDet.amenities.wifi.value);
      setGymDis(propertyDet.amenities.gym.value);
    }
    if (category) {
      let selOutCome = JSON.parse(category);
      setCategoryPass(selOutCome.name);
    }
    if (propUpdError) {
      alert.error(propUpdError);
      dispatch(myPropUpdClearErr(propUpdError));
    }
    if (propUpdLoading) {
      alert.info("update request sent...");
    }
    if (propUpdSucess && submit) {
      alert.success("property update succesfull!");
    }
  }, [
    alert,
    dispatch,
    propertyDet,
    propertyId,
    category,
    propUpdError,
    propUpdLoading,
    submit,
    propUpdSucess,
  ]);
  return (
    <>
      <section className="testingEditProp">
        <div className="editPropGridCont">
          {matches360 || matches414 ? (
            ""
          ) : (
            <div className="editPropSubCont">
              <div className="editPropInsCont">
                {navVariable === 1 ? (
                  <>
                    <span>update your property details</span>
                  </>
                ) : navVariable === 2 ? (
                  <>
                    <span>set your property basic feature</span>
                  </>
                ) : navVariable === 3 ? (
                  <>
                    <span>set your property images</span>
                  </>
                ) : navVariable === 4 ? (
                  <>
                    <span>set your property amenities</span>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          <div className="editPropSubCont">
            <div className="editPropDetCont">
              <div className="editPropDetContSub">
                {navVariable === 1 ? (
                  <>
                    <input
                      type="text"
                      className="editMyPropInp"
                      name="titleUpd"
                      value={propDetInp.titleUpd}
                      placeholder="title..."
                      onChange={(e) => handleInputPropUpd(e)}
                    />
                    <textarea
                      name="shortdesUpd"
                      className="editMyPropShortDes"
                      value={propDetInp.shortdesUpd}
                      cols="30"
                      rows="5"
                      placeholder="shortDescrip..."
                      onChange={(e) => handleInputPropUpd(e)}
                    ></textarea>
                    <textarea
                      name="desUpd"
                      className="editMyPropDes"
                      value={propDetInp.desUpd}
                      cols="30"
                      rows="10"
                      placeholder="description..."
                      onChange={(e) => handleInputPropUpd(e)}
                    ></textarea>
                    <textarea
                      name="addressUpd"
                      className="editMyPropAddr"
                      value={propDetInp.addressUpd}
                      cols="30"
                      rows="5"
                      placeholder="address..."
                      onChange={(e) => handleInputPropUpd(e)}
                    ></textarea>
                    <input
                      type="number"
                      className="editMyPropInp"
                      name="priceUpd"
                      value={propDetInp.priceUpd}
                      placeholder="price..."
                      onChange={(e) => handleInputPropUpd(e)}
                    />
                  </>
                ) : navVariable === 2 ? (
                  <>
                    <CustomSelector
                      value={categoryPass}
                      onChange={(val) => {
                        setCategory(JSON.stringify(val));
                      }}
                      options={propDetCatOpt}
                      label="name"
                      id="categUpdProp"
                    />
                    <div className="updPropRoomCont">
                      <div
                        className="setUpdPropRoom"
                        onClick={() => {
                          if (room < 5) {
                            setRoom(room + 1);
                          }
                        }}
                      >
                        <AddCircleOutline style={{ fontSize: fntSzCircle }} />
                      </div>
                      <div className="setUpdPropRoomDis">{room} Room</div>
                      <div
                        className="setUpdPropRoom"
                        onClick={() => {
                          if (room > 1) {
                            setRoom(room - 1);
                          }
                        }}
                      >
                        <RemoveCircleOutline
                          style={{ fontSize: fntSzCircle }}
                        />
                      </div>
                    </div>
                    <div className="updPropRoomCont">
                      <div
                        className="setUpdPropRoom"
                        onClick={() => {
                          if (guest < 5) {
                            setGuest(guest + 1);
                          }
                        }}
                      >
                        <AddCircleOutline style={{ fontSize: fntSzCircle }} />
                      </div>
                      <div className="setUpdPropRoomDis">{guest} guests</div>
                      <div
                        className="setUpdPropRoom"
                        onClick={() => {
                          if (guest > 1) {
                            setGuest(guest - 1);
                          }
                        }}
                      >
                        <RemoveCircleOutline
                          style={{ fontSize: fntSzCircle }}
                        />
                      </div>
                    </div>
                  </>
                ) : navVariable === 3 ? (
                  <>
                    <div className="setImageUpdPropContTest">
                      <div className="updPropImgContTest">
                        {isImgUpdated
                          ? upldedImg.map((elem, index) => {
                              return (
                                <div className="updPropImgSubCont">
                                  <img
                                    src={elem}
                                    alt="editImg"
                                    key={`updMyPropImgNew${index}`}
                                  />
                                </div>
                              );
                            })
                          : upldedImg.map((elem, index) => {
                              return (
                                <div className="updPropImgSubCont">
                                  <img
                                    src={elem.url}
                                    alt="editImg"
                                    key={`updMyPropImgNew${index}`}
                                  />
                                </div>
                              );
                            })}
                      </div>
                      <div className="setUpdPropImgContTest">
                        <label htmlFor="updPropuploadedImgs">
                          <PhotoCamera style={{ fontSize: fntSzPht }} />
                        </label>
                        <input
                          type="file"
                          multiple
                          id="updPropuploadedImgs"
                          accept="image/*"
                          onChange={(e) => {
                            handleImgUpld(e);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : navVariable === 4 ? (
                  <>
                    <div className="updPropAmenContTest">
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            acDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setAcDis(!acDis)}
                        >
                          <AcUnit style={{ fontSize: fntSz }} />
                          ac
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            swimDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setSwimDis(!swimDis)}
                        >
                          <Pool style={{ fontSize: fntSz }} />
                          swim
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            jacooziDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setJacooziDis(!jacooziDis)}
                        >
                          <HotTub style={{ fontSize: fntSz }} />
                          jacoozi
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            tvDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setTvDis(!tvDis)}
                        >
                          <Tv style={{ fontSize: fntSz }} />
                          tv
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            foodDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setFoodDis(!foodDis)}
                        >
                          <Kitchen style={{ fontSize: fntSz }} />
                          food
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            parkingDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setParkingDis(!parkingDis)}
                        >
                          <LocalParking style={{ fontSize: fntSz }} />
                          parking
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            barDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setBarDis(!barDis)}
                        >
                          <LocalBar style={{ fontSize: fntSz }} />
                          bar
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            wifiDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setWifiDis(!wifiDis)}
                        >
                          <Wifi style={{ fontSize: fntSz }} />
                          wifi
                        </span>
                      </div>
                      <div className="updPropAmenSubContTest">
                        <span
                          className={
                            gymDis
                              ? "updPropAmenTest actvUdpPropTest"
                              : "updPropAmenTest"
                          }
                          onClick={() => setGymDis(!gymDis)}
                        >
                          <FitnessCenter style={{ fontSize: fntSz }} />
                          gym
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="editPropDetNavigator">
                <button
                  className="navigationBtn"
                  onClick={() => {
                    if (navVariable > 1) {
                      return setNavVariable(navVariable - 1);
                    }
                  }}
                >
                  prev
                </button>
                {navVariable < 4 ? (
                  <button
                    className="navigationBtn"
                    onClick={() => {
                      if (navVariable < 4) {
                        return setNavVariable(navVariable + 1);
                      }
                    }}
                  >
                    next
                  </button>
                ) : (
                  <button
                    className="navigationBtn"
                    onClick={() => handleSubmit()}
                  >
                    submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditPropTesting;
