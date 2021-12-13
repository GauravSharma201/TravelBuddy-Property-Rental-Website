import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUSET,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUSET,
  LOAD_USER_SUCCESS,
  FORGOT_PASS_REQ,
  FORGOT_PASS_SUCC,
  FORGOT_PASS_FAIL,
  UPDATE_PROF_REQ,
  UPDATE_PROF_SUCC,
  UPDATE_PROF_FAIL,
  UPDATE_PASS_REQ,
  UPDATE_PASS_SUCC,
  UPDATE_PASS_FAIL,
  RESET_PASS_REQ,
  RESET_PASS_SUCC,
  RESET_PASS_FAIL,
  CLEAR_ERROR,
} from "./actionTypes";
import axios from "axios";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    let loginURL = "/login";
    let config = { headers: { "Content-Type": "application/json" } };
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      let { data } = await axios.post(loginURL, { email, password }, config);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data.User });
    } catch (error) {
      dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
    }
  };
};

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      let registerURL = "/register";
      let config = { headers: { "Content-Type": "application/json" } };
      dispatch({ type: REGISTER_USER_REQUSET });
      let { data } = await axios.post(registerURL, userData, config);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.User });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.message,
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      let logoutURL = "/logout";
      await axios.get(logoutURL);
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      let loadUserURL = "/me";
      dispatch({ type: LOAD_USER_REQUSET });
      let { data } = await axios.get(loadUserURL);
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.response });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    let forgotPassURL = "/password/forgot";
    let config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: FORGOT_PASS_REQ });
    let { data } = await axios.post(forgotPassURL, email, config);
    let response = data.message;
    dispatch({ type: FORGOT_PASS_SUCC, payload: response });
  } catch (error) {
    dispatch({ type: FORGOT_PASS_FAIL, error: error.response.data.message });
  }
};

export const updateUserProf = (updateData) => async (dispatch) => {
  try {
    let updateProfURL = "/me/update";
    let config = { headers: { "Content-Type": "multipart/form-data" } };
    dispatch({ type: UPDATE_PROF_REQ });
    let { data } = await axios.put(updateProfURL, updateData, config);
    dispatch({ type: UPDATE_PROF_SUCC, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PROF_FAIL, payload: error.message });
  }
};

export const updateUserPass = (passData) => async (dispatch) => {
  try {
    let updatePassURL = "/password/update";
    let config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: UPDATE_PASS_REQ });
    let { data } = await axios.put(updatePassURL, passData, config);
    dispatch({ type: UPDATE_PASS_SUCC, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PASS_FAIL, payload: error.message });
  }
};

export const resetUserPass = (resetpassData, token) => async (dispatch) => {
  try {
    let resetPassURL = `/password/reset/${token}`;
    let config = { headers: { "Content-Type": "application/json" } };
    dispatch({ type: RESET_PASS_REQ });
    let { data } = await axios.put(resetPassURL, resetpassData, config);
    dispatch({ type: RESET_PASS_SUCC, payload: data.success });
  } catch (error) {
    dispatch({ type: RESET_PASS_FAIL, payload: error.message });
  }
};

export const clearError = () => {
  return async (dispatch) => {
    return dispatch({ type: CLEAR_ERROR });
  };
};
// ADMIN
// export const adminLoginAct = (email, password) => {
//   return async (dispatch) => {
//     let loginURL = '/admin'
//     let config = { headers: { 'Content-Type': 'application/json' } }
//     try {
//       dispatch({ type: LOGIN_ADMIN_REQUEST })
//       let { data } = await axios.post(loginURL, { email, password }, config)
//       dispatch({ type: LOGIN_ADMIN_SUCCESS, payload: data.User })
//     } catch (error) {
//       dispatch({ type: LOGIN_ADMIN_FAIL, payload: error.response.data.message })
//     }
//   }
// }

// export const loadAdmin = () => {
//   return async (dispatch) => {
//     try {
//       let loadUserURL = '/admin/user'
//       dispatch({ type: LOAD_USERS_ADMIN_REQ })
//       let { data } = await axios.get(loadUserURL)
//       dispatch({ type: LOAD_USERS_ADMIN_SUCC, payload: data.response })
//     } catch (error) {
//       dispatch({
//         type: LOAD_USERS_ADMIN_ERR,
//         payload: error.response.data.message,
//       })
//     }
//   }
// }

// export const clearAdminError = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERROR })
// }
// ADMIN
