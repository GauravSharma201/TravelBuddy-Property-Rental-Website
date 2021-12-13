import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { forgotPassword, clearError } from "../../action/userAction";
import "./forgotPassword.css";
// import "./forgotPasswordSys.css";

let initialState = {
  email: "",
};
function ForgotPassword() {
  let [input, setInput] = useState(initialState);
  let dispatch = useDispatch();
  let alert = useAlert();
  let { error, message } = useSelector((state) => state.forgotPass);
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(input));
    setInput(initialState);
  };
  let handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setInput(() => {
      return { ...input, [name]: value };
    });
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  }, [error, message, alert, dispatch]);

  return (
    <>
      <form
        action=""
        className="forgotPassForm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="forgotPassEmail" className="forgotPasswordLabel">
          email
        </label>
        <input
          type="text"
          name="email"
          value={input.email}
          id="forgotPassEmail"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">send</button>
      </form>
    </>
  );
}

export default ForgotPassword;
