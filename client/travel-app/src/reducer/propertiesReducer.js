import {
  FETCH_PROPER_REQ,
  FETCH_PROPER_SUCC,
  FETCH_PROPER_FAIL,
  CLEAR_ERROR,
  CRT_PROP_SUCC,
  CRT_PROP_FAIL,
  CRT_PROP_REQ,
  CLEAR_ERROR_CRTPROP,
  GET_MY_PROPERTY_REQ,
  GET_MY_PROPERTY_SUCC,
  GET_MY_PROPERTY_ERR,
  GET_MY_PROP_CLEARERR,
} from '../action/actionTypes.js'

export const propertiesReducer = (state = { propertyArr: [] }, action) => {
  switch (action.type) {
    case FETCH_PROPER_REQ:
      return {
        ...state,
        loading: true,
      }
    case FETCH_PROPER_SUCC:
      return {
        ...state,
        loading: false,
        propertyArr: action.payload.response,
        numOfPropr: action.payload.numOfProperties,
        resultPerPg: action.payload.resultPerPage,
        error: null,
      }
    case FETCH_PROPER_FAIL:
      return {
        loading: false,
        error: action.payload,
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

export const createPropReducer = (state = { crtdProperty: {} }, action) => {
  switch (action.type) {
    case CRT_PROP_REQ:
      return {
        crtPropLoading: true,
        crtdPropSuccess: false,
        ...state,
      }
    case CRT_PROP_SUCC:
      return {
        ...state,
        crtPropLoading: false,
        crtdProperty: action.payload,
        crtdPropSuccess: true,
        crtPropErr: null,
      }
    case CRT_PROP_FAIL:
      return {
        crtPropErr: action.payload,
        crtPropLoading: false,
        crtdPropSuccess: false,
      }
    case CLEAR_ERROR_CRTPROP:
      return {
        ...state,
        crtPropErr: null,
      }
    default:
      return state
  }
}

export const getMyPropReducer = (state = { myProperties: [] }, action) => {
  switch (action.type) {
    case GET_MY_PROPERTY_REQ:
      return {
        myPropLoading: true,
        ...state,
      }
    case GET_MY_PROPERTY_SUCC:
      return {
        ...state,
        myPropLoading: false,
        myPropSuccess: true,
        myProperties: action.payload,
        myPropError: null,
      }
    case GET_MY_PROPERTY_ERR:
      return {
        myPropLoading: false,
        myPropSuccess: false,
        myPropError: action.payload,
      }
    case GET_MY_PROP_CLEARERR:
      return {
        ...state,
        myPropError: null,
      }
    default:
      return state
  }
}
