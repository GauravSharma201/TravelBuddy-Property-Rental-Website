import {
  CREATE_BOOKING_SUCC,
  CREATE_BOOKING_ERR,
  CLEAR_BOOKING_ERROR,
  GET_MYBOOK_SUCC,
  GET_MYBOOK_ERR,
  GET_MYBOOK_CLEAR_ERR,
  GET_MY_PROPBOOKING_REQ,
  GET_MY_PROPBOOKING_SUCC,
  GET_MY_PROPBOOKING_ERR,
  GET_MY_PROPBOOKING_CLEARERR,
} from './actionTypes'
import axios from 'axios'

export const createBookingAct = (bookingData) => async (dispatch) => {
  try {
    let createBookingURL = '/booking'
    let config = { headers: { 'Content-Type': 'application/json' } }
    let { data } = await axios.post(createBookingURL, bookingData, config)
    let result = data.response
    dispatch({ type: CREATE_BOOKING_SUCC, payload: result })
  } catch (error) {
    dispatch({ type: CREATE_BOOKING_ERR, payload: error.message })
  }
}

export const clearBookingErrAct = () => async (dispatch) => {
  dispatch({ type: CLEAR_BOOKING_ERROR })
}

export const getMyBookings = () => async (dispatch) => {
  try {
    let getMyBookURL = '/me/bookings'
    let { data } = await axios.get(getMyBookURL)
    let result = data.response

    dispatch({ type: GET_MYBOOK_SUCC, payload: result })
  } catch (error) {
    dispatch({ type: GET_MYBOOK_ERR, payload: error.message })
  }
}

export const clearGetMyBookingErrAct = () => async (dispatch) => {
  dispatch({ type: GET_MYBOOK_CLEAR_ERR })
}

export const getMyPropBookingAct = (propertyId) => async (dispatch) => {
  try {
    let getMyPropBookURL = `/admin/property/myProperty/${propertyId}`
    dispatch({ type: GET_MY_PROPBOOKING_REQ })
    let { data } = await axios.get(getMyPropBookURL)
    let result = data.response
    dispatch({ type: GET_MY_PROPBOOKING_SUCC, payload: result })
  } catch (error) {
    dispatch({ type: GET_MY_PROPBOOKING_ERR, payload: error.message })
  }
}

export const clearGetMyPropBookErrAct = () => async (dispatch) => {
  dispatch({ type: GET_MY_PROPBOOKING_CLEARERR })
}
