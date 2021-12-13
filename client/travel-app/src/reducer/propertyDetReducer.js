import {
  FETCH_PROP_DETAILS_FAIL,
  FETCH_PROP_DETAILS_REQ,
  FETCH_PROP_DETAILS_SUCC,
  CREATE_REVIEW_REQ,
  CREATE_REVIEW_SUCC,
  CREATE_REVIEW_FAIL,
  CLEAR_ERROR,
  MY_PROPUPDATE_REQ,
  MY_PROPUPDATE_SUCC,
  MY_PROPUPDATE_ERR,
  MY_PROPUPDATE_CLEARERR,
} from '../action/actionTypes'

export const PropertyDetReducer = (state = { propertyDet: [] }, action) => {
  switch (action.type) {
    case FETCH_PROP_DETAILS_REQ:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PROP_DETAILS_SUCC:
      return {
        loading: false,
        propertyDet: action.payload,
      }
    case FETCH_PROP_DETAILS_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    case CLEAR_ERROR:
      return {
        error: null,
        ...state,
      }
    default:
      return state
  }
}

export const createReivewReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_REVIEW_REQ:
      return {
        ...state,
        createRevLoading: true,
      }
    case CREATE_REVIEW_SUCC:
      return {
        ...state,
        createRevLoading: false,
        createdReview: action.payload,
      }
    case CREATE_REVIEW_FAIL:
      return {
        createRevError: action.payload,
        createRevLoading: false,
      }
    case CLEAR_ERROR:
      return {
        createRevError: null,
        ...state,
      }
    default:
      return state
  }
}

export const myPropUpdateReducer = (state = { updtedProp: {} }, action) => {
  switch (action.type) {
    case MY_PROPUPDATE_REQ:
      return {
        ...state,
        propUpdLoading: true,
        propUpdSucess: false,
      }
    case MY_PROPUPDATE_SUCC:
      return {
        ...state,
        propUpdLoading: true,
        updtedProp: action.payload,
        propUpdSucess: true,
      }
    case MY_PROPUPDATE_ERR:
      return {
        propUpdError: action.payload,
        propUpdLoading: false,
        propUpdSucess: false,
      }
    case MY_PROPUPDATE_CLEARERR:
      return {
        propUpdError: null,
        ...state,
      }
    default:
      return state
  }
}
