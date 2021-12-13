import {
  FETCH_PROPER_REQ,
  FETCH_PROPER_SUCC,
  FETCH_PROPER_FAIL,
  FETCH_PROP_DETAILS_REQ,
  FETCH_PROP_DETAILS_SUCC,
  FETCH_PROP_DETAILS_FAIL,
  CREATE_REVIEW_REQ,
  CREATE_REVIEW_SUCC,
  CREATE_REVIEW_FAIL,
  CRT_PROP_SUCC,
  CRT_PROP_FAIL,
  CRT_PROP_REQ,
  CLEAR_ERROR,
  CLEAR_ERROR_CRTPROP,
  GET_MY_PROPERTY_REQ,
  GET_MY_PROPERTY_SUCC,
  GET_MY_PROPERTY_ERR,
  GET_MY_PROP_CLEARERR,
  MY_PROPUPDATE_REQ,
  MY_PROPUPDATE_SUCC,
  MY_PROPUPDATE_ERR,
  MY_PROPUPDATE_CLEARERR,
} from '../action/actionTypes'
import axios from 'axios'

export const getAllProperties =
  (
    keyword = '',
    category,
    ratings = 0,
    price = [0, 500000],
    currentPage = 1,
    room = 1,
    country
  ) =>
  async (dispatch) => {
    try {
      // &state=${state}&city=${city}
      let getAllProdURL = `/properties?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&room=${room}&country=${country}`
      if (category) {
        getAllProdURL = `/properties?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&room=${room}&category=${category}&country=${country}`
      }

      dispatch({ type: FETCH_PROPER_REQ })
      let { data } = await axios.get(getAllProdURL)
      let response = {
        response: data.response,
        numOfProperties: data.numOfFilteredProperty,
        resultPerPage: data.resultPerPage,
      }

      dispatch({ type: FETCH_PROPER_SUCC, payload: response })
    } catch (error) {
      dispatch({
        type: FETCH_PROPER_FAIL,
        payload: error.response.data.message,
      })
    }
  }

export const getPropertyDetails = (propertyId) => async (dispatch) => {
  try {
    let getPropDetURL = `/property/${propertyId}`
    dispatch({ type: FETCH_PROP_DETAILS_REQ })
    let { data } = await axios.get(getPropDetURL)
    let response = data.response
    let colInfo = { ...response, hostName: data.host, hostImage: data.hostImg }
    dispatch({ type: FETCH_PROP_DETAILS_SUCC, payload: colInfo })
  } catch (error) {
    dispatch({
      type: FETCH_PROP_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const createReivew = (commentData) => async (dispatch) => {
  try {
    let createReviewURL = '/review'

    let config = { headers: { 'Content-Type': 'application/json' } }
    dispatch({ type: CREATE_REVIEW_REQ })
    let { data } = await axios.put(createReviewURL, commentData, config)
    let response = data.reviews

    dispatch({ type: CREATE_REVIEW_SUCC, payload: response })
  } catch (error) {
    dispatch({ type: CREATE_REVIEW_FAIL, payload: error.response.data.message })
  }
}

export const createPropertyAct = (propertyData) => async (dispatch) => {
  try {
    let crtPropURL = '/admin/property/new'
    dispatch({ type: CRT_PROP_REQ })
    let config = { headers: { 'Content-Type': 'application/json' } }
    let { data } = await axios.post(crtPropURL, propertyData, config)

    let result = data.response
    dispatch({ type: CRT_PROP_SUCC, payload: result })
  } catch (error) {
    dispatch({ type: CRT_PROP_FAIL, payload: error.message })
  }
}

export const getMyPropertiesAct = () => async (dispatch) => {
  try {
    let getMyPropURL = '/admin/property/myProperty'
    dispatch({ type: GET_MY_PROPERTY_REQ })
    let { data } = await axios.get(getMyPropURL)
    let result = data.response
    dispatch({ type: GET_MY_PROPERTY_SUCC, payload: result })
  } catch (error) {
    dispatch({ type: GET_MY_PROPERTY_ERR, payload: error.message })
  }
}

export const updateMyPropAct =
  (propertyId, propertyData) => async (dispatch) => {
    try {
      let updMyPropURL = `/admin/property/${propertyId}`
      dispatch({ type: MY_PROPUPDATE_REQ })
      let { data } = await axios.put(updMyPropURL, propertyData)
      let result = data.response

      dispatch({ type: MY_PROPUPDATE_SUCC, payload: result })
    } catch (error) {
      dispatch({ type: MY_PROPUPDATE_ERR, payload: error.message })
    }
  }

export const crtPropClearErr = () => async (dispatch) => {
  return dispatch({ type: CLEAR_ERROR_CRTPROP })
}

export const clearError = () => {
  return async (dispatch) => {
    return dispatch({ type: CLEAR_ERROR })
  }
}

export const getMyPropClearErr = () => async (dispatch) => {
  return dispatch({ type: GET_MY_PROP_CLEARERR })
}

export const myPropUpdClearErr = () => async (dispatch) => {
  return dispatch({ type: MY_PROPUPDATE_CLEARERR })
}
