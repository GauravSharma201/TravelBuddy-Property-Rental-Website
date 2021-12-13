import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import {
  PhotoCamera,
  AddCircleOutline,
  RemoveCircleOutline,
} from '@material-ui/icons'
import {
  getPropertyDetails,
  updateMyPropAct,
  myPropUpdClearErr,
} from '../../action/propertiesAction'
import CustomSelector from '../customSelector/customSelector'
import './editMyProp.css'
function EditMyProp({ match }) {
  let { error, propertyDet } = useSelector((state) => state.property)
  let { propUpdError, propUpdLoading, propUpdSucess } = useSelector(
    (state) => state.myPropUpdate
  )
  let dispatch = useDispatch()
  let alert = useAlert()
  let [submit, setSubmit] = useState(false)
  let [room, setRoom] = useState(1)
  let [guest, setGuest] = useState(1)
  let [category, setCategory] = useState(null)
  let [categoryPass, setCategoryPass] = useState(null)
  // useStates for amenities selector ................. {
  let [acDis, setAcDis] = useState(false)
  let [swimDis, setSwimDis] = useState(false)
  let [jacooziDis, setJacooziDis] = useState(false)
  let [tvDis, setTvDis] = useState(false)
  let [foodDis, setFoodDis] = useState(false)
  let [parkingDis, setParkingDis] = useState(false)
  let [barDis, setBarDis] = useState(false)
  let [wifiDis, setWifiDis] = useState(false)
  let [gymDis, setGymDis] = useState(false)
  // useStates for amenities selector ................. }
  // useStates for upload image selector ................. {
  let [upldedImg, setUpldedImg] = useState([])
  let [isImgUpdated, setIsImgUpdated] = useState(false)
  // useStates for upload image selector ................. }
  // useStates for property detail ................. {
  let initialState = {
    titleUpd: '',
    shortdesUpd: '',
    desUpd: '',
    addressUpd: '',
    priceUpd: 0,
  }
  let propDetCatOpt = [
    { name: 'Residential Home' },
    { name: 'Villa' },
    { name: 'Cabin' },
    { name: 'Town House' },
    { name: 'Bungalow' },
  ]
  let [propDetInp, setPropDetInp] = useState(initialState)
  // useStates for property detail ................. }
  let handleInputPropUpd = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (e.target.name === 'priceUpd') {
      setPropDetInp({ ...propDetInp, [name]: Number(value) })
    } else {
      setPropDetInp({ ...propDetInp, [name]: value })
    }
  }
  let handleSubmit = (e) => {
    e.preventDefault()

    let amenities = {
      ac: { name: 'ac', value: acDis },
      jaccozi: { name: 'jacoozi', value: jacooziDis },
      parking: { name: 'parking', value: wifiDis },
      bar: { name: 'bar', value: barDis },
      tv: { name: 'tv', value: tvDis },
      food: { name: 'food', value: foodDis },
      wifi: { name: 'wifi', value: parkingDis },
      swimming: { name: 'swimming', value: swimDis },
      gym: { name: 'gym', value: gymDis },
    }

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
    }

    dispatch(updateMyPropAct(match.params.id, propertyData))
    setSubmit(true)
  }
  let handleImgUpld = (e) => {
    let files = e.target.files
    let length = files.length

    if (e.target.files && length >= 5) {
      const files = Array.from(e.target.files)

      setUpldedImg([])
      files.forEach((file) => {
        const reader = new FileReader()

        reader.onload = () => {
          if (reader.readyState === 2) {
            let val = reader.result
            setUpldedImg((old) => [...old, val])
            setIsImgUpdated(true)
          }
        }

        reader.readAsDataURL(file)
      })
    }
  }
  let propertyId = match.params.id
  useEffect(() => {
    if (propertyDet && propertyDet._id !== propertyId) {
      dispatch(getPropertyDetails(propertyId))
    } else if (propertyDet && propertyDet.amenities && propertyDet.images) {
      let initialState = {
        titleUpd: propertyDet.title,
        shortdesUpd: propertyDet.shortDescription,
        desUpd: propertyDet.description,
        addressUpd: propertyDet.address,
        priceUpd: propertyDet.price,
      }
      // let newImgArr = []
      // propertyDet.images.forEach((elem) => {
      //   newImgArr.push(elem.url)
      // })

      setPropDetInp(initialState)
      setCategoryPass(propertyDet.category)
      setUpldedImg(propertyDet.images)
      setRoom(propertyDet.room)
      setGuest(propertyDet.guests)
      setAcDis(propertyDet.amenities.ac.value)
      setSwimDis(propertyDet.amenities.swimming.value)
      setJacooziDis(propertyDet.amenities.jaccozi.value)
      setTvDis(propertyDet.amenities.tv.value)
      setFoodDis(propertyDet.amenities.food.value)
      setParkingDis(propertyDet.amenities.parking.value)
      setBarDis(propertyDet.amenities.bar.value)
      setWifiDis(propertyDet.amenities.wifi.value)
      setGymDis(propertyDet.amenities.gym.value)
    }
    if (category) {
      let selOutCome = JSON.parse(category)
      setCategoryPass(selOutCome.name)
    }
    if (propUpdError) {
      alert.error(propUpdError)
      dispatch(myPropUpdClearErr(propUpdError))
    }
    if (propUpdLoading) {
      alert.info('update request sent...')
    }
    if (propUpdSucess && submit) {
      alert.info('property update succesfull!')
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
  ])
  return (
    <>
      <section className="editPropSection">
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="updPropertyForm"
        >
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
            className="editMyPropInp"
            value={propDetInp.shortdesUpd}
            cols="30"
            rows="5"
            placeholder="shortDescrip..."
            onChange={(e) => handleInputPropUpd(e)}
          ></textarea>
          <textarea
            name="desUpd"
            className="editMyPropInp"
            value={propDetInp.desUpd}
            cols="30"
            rows="10"
            placeholder="description..."
            onChange={(e) => handleInputPropUpd(e)}
          ></textarea>
          <textarea
            name="addressUpd"
            className="editMyPropInp"
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
          <CustomSelector
            value={categoryPass}
            onChange={(val) => {
              setCategory(JSON.stringify(val))
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
                  setRoom(room + 1)
                }
              }}
            >
              <AddCircleOutline />
            </div>
            <div className="setUpdPropRoom">{room}</div>
            <div
              className="setUpdPropRoom"
              onClick={() => {
                if (room > 1) {
                  setRoom(room - 1)
                }
              }}
            >
              <RemoveCircleOutline />
            </div>
          </div>
          <div className="updPropRoomCont">
            <div
              className="setUpdPropRoom"
              onClick={() => {
                if (guest < 5) {
                  setGuest(guest + 1)
                }
              }}
            >
              <AddCircleOutline />
            </div>
            <div className="setUpdPropRoom">{guest}</div>
            <div
              className="setUpdPropRoom"
              onClick={() => {
                if (guest > 1) {
                  setGuest(guest - 1)
                }
              }}
            >
              <RemoveCircleOutline />
            </div>
          </div>
          <div className="setImageUpdPropCont">
            <div className="updPropImgCont">
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
                    )
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
                    )
                  })}
              {/* <div className="updPropImgSubCont">
                <img src={upldedImg[0]} alt="editImg" />
              </div>
              <div className="updPropImgSubCont">
                <img src={upldedImg[1]} alt="editImg" />
              </div>
              <div className="updPropImgSubCont">
                <img src={upldedImg[2]} alt="editImg" />
              </div>
              <div className="updPropImgSubCont">
                <img src={upldedImg[3]} alt="editImg" />
              </div>
              <div className="updPropImgSubCont">
                <img src={upldedImg[4]} alt="editImg" />
              </div> */}
            </div>
            <div className="setUpdPropImgCont">
              <label htmlFor="updPropuploadedImgs">
                <PhotoCamera />
              </label>
              <input
                type="file"
                multiple
                id="updPropuploadedImgs"
                accept="image/*"
                onChange={(e) => {
                  handleImgUpld(e)
                }}
              />
            </div>
          </div>
          <div className="updPropAmenCont">
            <div className="updPropAmenSubCont">
              <span
                className={acDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setAcDis(!acDis)}
              >
                ac
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={swimDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setSwimDis(!swimDis)}
              >
                swim
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={
                  jacooziDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'
                }
                onClick={() => setJacooziDis(!jacooziDis)}
              >
                jacoozi
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={tvDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setTvDis(!tvDis)}
              >
                tv
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={foodDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setFoodDis(!foodDis)}
              >
                food
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={
                  parkingDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'
                }
                onClick={() => setParkingDis(!parkingDis)}
              >
                parking
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={barDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setBarDis(!barDis)}
              >
                bar
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={wifiDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setWifiDis(!wifiDis)}
              >
                wifi
              </span>
            </div>
            <div className="updPropAmenSubCont">
              <span
                className={gymDis ? 'updPropAmen actvUdpProp' : 'updPropAmen'}
                onClick={() => setGymDis(!gymDis)}
              >
                gym
              </span>
            </div>
          </div>
          <button type="submit">submit</button>
        </form>
      </section>
    </>
  )
}

export default EditMyProp
