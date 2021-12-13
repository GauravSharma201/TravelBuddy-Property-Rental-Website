import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUSET,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUSET,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  FORGOT_PASS_REQ,
  FORGOT_PASS_SUCC,
  FORGOT_PASS_FAIL,
  UPDATE_PROF_REQ,
  UPDATE_PROF_SUCC,
  UPDATE_PROF_FAIL,
  UPDATE_PROF_RESET,
  UPDATE_PASS_REQ,
  UPDATE_PASS_SUCC,
  UPDATE_PASS_FAIL,
  UPDATE_PASS_RESET,
  RESET_PASS_REQ,
  RESET_PASS_SUCC,
  RESET_PASS_FAIL,
  CLEAR_ERROR,
} from '../action/actionTypes'

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUSET:
    case LOAD_USER_REQUSET:
      return {
        loading: true,
        isAuthenticated: false,
      }
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      }
    case LOAD_USER_FAIL:
      return {
        ...state,
        loadError: action.payload,
        loading: false,
        user: null,
        isAuthenticated: false,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      }
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASS_REQ:
    case RESET_PASS_REQ:
      return {
        ...state,
        loading: true,
      }
    case FORGOT_PASS_SUCC:
      return {
        ...state,
        message: action.payload,
        loading: false,
        error: null,
      }
    case RESET_PASS_SUCC:
      return {
        ...state,
        success: action.payload,
        loading: false,
      }
    case FORGOT_PASS_FAIL:
    case RESET_PASS_FAIL:
      return {
        error: action.payload,
        loading: false,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const updateUsrProfReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROF_REQ:
      return {
        ...state,
        updLoading: true,
        isUpdated: false,
      }
    case UPDATE_PROF_SUCC:
      return {
        ...state,
        updLoading: false,
        isUpdated: action.payload,
      }
    case UPDATE_PROF_FAIL:
      return {
        ...state,
        updLoading: false,
        updError: action.payload,
        isUpdated: false,
      }
    case UPDATE_PROF_RESET:
      return {
        ...state,
        isUpdated: false,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        updError: null,
      }
    default:
      return state
  }
}

export const updateUsrPassReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASS_REQ:
      return {
        ...state,
        updPassLoading: true,
        isPassUpdated: false,
      }
    case UPDATE_PASS_SUCC:
      return {
        ...state,
        updPassLoading: false,
        isPassUpdated: action.payload,
      }
    case UPDATE_PASS_FAIL:
      return {
        ...state,
        updPassLoading: false,
        updPassError: action.payload,
        isPassUpdated: false,
      }
    case UPDATE_PASS_RESET:
      return {
        ...state,
        isPassUpdated: false,
      }
    case CLEAR_ERROR:
      return {
        ...state,
        updPassError: null,
      }
    default:
      return state
  }
}
