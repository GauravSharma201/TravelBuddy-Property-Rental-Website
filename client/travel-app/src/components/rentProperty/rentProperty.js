import React, { useState, useEffect, useRef } from "react";
import "./rentProperty.css";
// import "./rentPropertySys.css";
import { Country, State, City } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import RentalPropAmenities from "../createPropComp/amenities/rentalPropAmenities";
import RentalPropUpldImg from "../createPropComp/uploadImage/rentalPropUpldImg";
import RentalPropDetail from "../createPropComp/propDetail/rentalPropDetail";
import CustomSelector from "../customSelector/customSelector";
import { createPropertyAct } from "../../action/propertiesAction";
import { useAlert } from "react-alert";
import { crtPropClearErr } from "../../action/propertiesAction";
import { useMediaQuery } from "@material-ui/core";

function RentProperty() {
  let [navNumber, setNavNumber] = useState(1);
  let { crtPropLoading, crtdPropSuccess, crtPropErr } = useSelector(
    (state) => state.createdProperty
  );
  let dispatch = useDispatch();
  let alert = useAlert();
  let [submitBtn, setSubmitBtn] = useState(false);
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches360 = useMediaQuery("(max-width:360px)");
  // let rentalPropSubmitBtn = useRef(null)

  // useStates for custom selector ................. {
  let [country, setCountry] = useState(null);
  let [statesToPass, setStatesToPass] = useState(null);
  let [states, setStates] = useState(null);
  let [citiesToPass, setCitiesToPass] = useState(null);
  let [cities, setCities] = useState(null);
  let [cityVal, setCityVal] = useState(null);
  let [stateVal, setStateVal] = useState(null);
  let [countryVal, setCountryVal] = useState(null);
  let [address, setAddress] = useState("");
  // useStates for custom selector ................. }
  // useStates for amenities selector ................. {
  let [amenitiesPass, setAmenitiesPass] = useState(null);
  // let [amenitiesPass, setAmenitiesPass] = useState(null)
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
  // useStates for upload image selector ................. {
  let [upldedImg, setUpldedImg] = useState([]);
  let [upldedImgPass, setUpldedImgPass] = useState(null);
  // useStates for upload image selector ................. }
  // useStates for property detail ................. {
  let initialState = {
    rentalTitle: "",
    rentalShortDes: "",
    rentalDes: "",
    rentalPrice: 0,
  };
  let propDetCatOpt = [
    { name: "Residential Home" },
    { name: "Villa" },
    { name: "Cabin" },
    { name: "Town House" },
    { name: "Bungalow" },
  ];
  let [propDetInp, setPropDetInp] = useState(initialState);
  let [propDetInpPass, setPropDetInpPass] = useState(null);
  let [propDetRoom, setPropDetRoom] = useState(1);
  let [propDetGuest, setPropDetGuest] = useState(1);
  let [propDetRoomPass, setPropDetRoomPass] = useState(null);
  let [propDetGuestPass, setPropDetGuestPass] = useState(null);
  let [category, setCategory] = useState(null);
  let [categoryPass, setCategoryPass] = useState(null);
  // useStates for property detail ................. }

  let handleNext = () => {
    if (navNumber < 4) setNavNumber(navNumber + 1);
    return;
  };
  let handleBack = () => {
    if (navNumber > 1) setNavNumber(navNumber - 1);
    return;
  };
  let optionsCount;
  let statesOfCount = useRef(null);
  if (Country) {
    optionsCount = Country.getAllCountries();
  }
  let handleSubmitRentProp = () => {
    let amenities = JSON.parse(amenitiesPass);
    let propertyData = {
      title: propDetInp.rentalTitle,
      address: address,
      city: cityVal,
      state: stateVal,
      country: countryVal,
      amenities: amenities,
      description: propDetInp.rentalDes,
      shortDescription: propDetInp.rentalShortDes,
      images: upldedImg,
      room: propDetRoom,
      price: propDetInp.rentalPrice,
      category: categoryPass,
      guests: propDetGuest,
    };
    console.log(propertyData);
    dispatch(createPropertyAct(propertyData));
    setSubmitBtn(true);
  };
  useEffect(() => {
    if (country) {
      let selOutCome = JSON.parse(country);
      setCountryVal(selOutCome.name);

      if (State) {
        setStatesToPass(State.getStatesOfCountry(selOutCome.isoCode));
      }
    }
    if (country && states) {
      let selOutComeSates = JSON.parse(states);
      setStateVal(selOutComeSates.name);
      let selOutComeCountry = JSON.parse(country);
      if (City) {
        setCitiesToPass(
          City.getCitiesOfState(
            selOutComeCountry.isoCode,
            selOutComeSates.isoCode
          )
        );
      }
    }
    if (cities) {
      let selOutComeCities = JSON.parse(cities);
      setCityVal(selOutComeCities.name);
    }
    let amenities = {
      ac: { name: "ac", value: acDis },
      jacoozi: { name: "jacoozi", value: jacooziDis },
      parking: { name: "parking", value: wifiDis },
      bar: { name: "bar", value: barDis },
      tv: { name: "tv", value: tvDis },
      food: { name: "food", value: foodDis },
      wifi: { name: "wifi", value: parkingDis },
      swimming: { name: "swimming", value: swimDis },
      gym: { name: "gym", value: gymDis },
    };
    // if (amenities) {
    setAmenitiesPass(JSON.stringify(amenities));

    if (upldedImg.length >= 5) {
      setUpldedImgPass(upldedImg);
    }
    setPropDetInpPass(propDetInp);
    setPropDetRoomPass(propDetRoom);
    setPropDetGuestPass(propDetGuest);
    if (category) {
      let selOutCome = JSON.parse(category);
      setCategoryPass(selOutCome.name);
    }
    if (crtPropLoading) {
      alert.info("loading request...");
      // dispatch(crtPropClearErr())
    }
    console.log("this is submitbtn ", submitBtn);
    if (crtdPropSuccess && submitBtn) {
      console.log(
        "this is submitbtn with propsuccess",
        crtdPropSuccess,
        submitBtn
      );
      alert.success("property created successfully...");
      // dispatch(crtPropClearErr())
    }
    if (crtPropErr) {
      alert.error("request failed...");
      dispatch(crtPropClearErr());
    }
  }, [
    country,
    statesOfCount,
    states,
    cities,
    acDis,
    jacooziDis,
    wifiDis,
    barDis,
    tvDis,
    foodDis,
    parkingDis,
    swimDis,
    gymDis,
    upldedImg,
    propDetInp,
    category,
    propDetGuest,
    propDetRoom,
    alert,
    crtPropErr,
    crtPropLoading,
    dispatch,
    crtdPropSuccess,
    submitBtn,
  ]);
  return (
    <section className="rentPropertySec">
      {matches360 || matches414 ? (
        ""
      ) : (
        <div className="rentPropSubCont">
          <div className="processHeading">
            {navNumber === 1 ? (
              <span>Add Your Location For Rental Property</span>
            ) : navNumber === 2 ? (
              <span>Select Amenities Of Your Rental Property</span>
            ) : navNumber === 3 ? (
              <span>Upload Atleast Five Images For Your Rental Property</span>
            ) : navNumber === 4 ? (
              <span>Add Other Essential Details For Your Rental Property</span>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <div className="rentPropSubCont">
        {navNumber === 1 ? (
          <div className="addressFormContCrtProp">
            {/* rentalAddressCont */}
            <CustomSelector
              value={countryVal}
              onChange={(val) => {
                val = JSON.stringify(val);
                setCountry(val);
              }}
              options={optionsCount}
              label="name"
              id="country"
            />
            <CustomSelector
              value={stateVal}
              onChange={(val) => {
                val = JSON.stringify(val);
                setStates(val);
              }}
              options={statesToPass}
              label="name"
              id="state"
            />
            <CustomSelector
              value={cityVal}
              onChange={(val) => {
                val = JSON.stringify(val);
                setCities(val);
              }}
              options={citiesToPass}
              label="name"
              id="city"
            />
            <textarea
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="addressInputRentalProp"
              cols="30"
              rows="10"
              placeholder="address..."
            ></textarea>
            {/* rentalAddressCont */}
          </div>
        ) : navNumber === 2 ? (
          <div className="selectAmenitiesContCrtProp">
            <RentalPropAmenities
              acSet={() => setAcDis(!acDis)}
              swimSet={() => setSwimDis(!swimDis)}
              jaczSet={() => setJacooziDis(!jacooziDis)}
              tvSet={() => setTvDis(!tvDis)}
              foodSet={() => setFoodDis(!foodDis)}
              parkSet={() => setParkingDis(!parkingDis)}
              barSet={() => setBarDis(!barDis)}
              wifiSet={() => setWifiDis(!wifiDis)}
              gymSet={() => setGymDis(!gymDis)}
              amenVal={amenitiesPass}
            />
          </div>
        ) : navNumber === 3 ? (
          <div className="uploadImagesContCrtProp">
            <RentalPropUpldImg
              upldImgVal={upldedImgPass}
              onChange={(val) => {
                setUpldedImg((old) => [...old, val]);
              }}
              settNull={() => {
                setUpldedImg([]);
              }}
            />
          </div>
        ) : navNumber === 4 ? (
          <div className="propertyDetContCrtProp">
            <div className="propertyDetContCrtPropSub">
              <RentalPropDetail
                onInpChange={(e) => {
                  let value = e.target.value;
                  let name = e.target.name;
                  if (e.target.name === "rentalPrice") {
                    setPropDetInp({ ...propDetInp, [name]: Number(value) });
                  } else {
                    setPropDetInp({ ...propDetInp, [name]: value });
                  }
                }}
                propDetInpVal={propDetInpPass}
                incRoom={() => {
                  if (propDetRoom < 5) {
                    setPropDetRoom(propDetRoom + 1);
                  }
                }}
                decRoom={() => {
                  if (propDetRoom > 1) {
                    setPropDetRoom(propDetRoom - 1);
                  }
                }}
                incGuest={() => {
                  if (propDetGuest < 5) {
                    setPropDetGuest(propDetGuest + 1);
                  }
                }}
                decGuest={() => {
                  if (propDetGuest > 1) {
                    setPropDetGuest(propDetGuest - 1);
                  }
                }}
                roomVal={propDetRoomPass}
                guestVal={propDetGuestPass}
              />
              <CustomSelector
                value={categoryPass}
                onChange={(val) => {
                  setCategory(JSON.stringify(val));
                }}
                options={propDetCatOpt}
                label="name"
                id="categ"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="navigationCont">
          <button onClick={() => handleBack()}>back</button>

          {navNumber > 3 ? (
            <button
              onClick={() => handleSubmitRentProp()}
              disabled={
                country &&
                states &&
                cities &&
                upldedImg &&
                propDetInp.rentalTitle &&
                propDetInp.rentalDes &&
                propDetInp.rentalPrice &&
                propDetInp.rentalShortDes &&
                category
                  ? false
                  : true
              }
            >
              submit
            </button>
          ) : (
            <button onClick={() => handleNext()} disabled={false}>
              next
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default RentProperty;
