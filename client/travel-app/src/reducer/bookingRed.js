import {
  CREATE_BOOKING_SUCC,
  CREATE_BOOKING_ERR,
  CLEAR_BOOKING_ERROR,
  GET_MYBOOK_SUCC,
  GET_MYBOOK_ERR,
  GET_MYBOOK_CLEAR_ERR,
  GET_MY_PROPBOOKING_SUCC,
  GET_MY_PROPBOOKING_ERR,
  GET_MY_PROPBOOKING_CLEARERR,
} from '../action/actionTypes'

export const bookingReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case CREATE_BOOKING_SUCC:
      return {
        ...state,
        booking: action.payload,
        bookingSuccess: true,
      }
    case CREATE_BOOKING_ERR:
      return {
        bookingErr: action.payload,
        bookingSuccess: false,
        ...state,
      }
    case CLEAR_BOOKING_ERROR:
      return {
        bookingErr: null,
        bookingSuccess: false,
        ...state,
      }
    default:
      return state
  }
}

export const getMyBookingsReducer = (state = { myBookings: [] }, action) => {
  switch (action.type) {
    case GET_MYBOOK_SUCC:
      return {
        ...state,
        myBookings: action.payload,
      }
    case GET_MYBOOK_ERR:
      return {
        ...state,
        myBookingsErr: action.payload,
      }
    case GET_MYBOOK_CLEAR_ERR:
      return {
        ...state,
        myBookingsErr: null,
      }
    default:
      return state
  }
}

export const getMyPropBookReducer = (
  state = { myPropBookings: [] },
  action
) => {
  switch (action.type) {
    case GET_MY_PROPBOOKING_SUCC:
      return {
        ...state,
        myPropBookings: action.payload,
      }
    case GET_MY_PROPBOOKING_ERR:
      return {
        ...state,
        myPropBookErr: action.payload,
      }
    case GET_MY_PROPBOOKING_CLEARERR:
      return {
        ...state,
        myPropBookErr: null,
      }
    default:
      return state
  }
}
