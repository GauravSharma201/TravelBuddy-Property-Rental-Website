import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./loginForm.css";
// import "./loginFormSys.css";
import { loginUser, clearError } from "../../action/userAction";
import { useAlert } from "react-alert";

const initial = {
  email: "",
  password: "",
};
function LoginForm() {
  let { error } = useSelector((state) => state.user);
  let [input, setInput] = useState(initial);
  let alert = useAlert();
  let dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput(() => {
      return { ...input, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('this is email, password', input.email, input.password)
    dispatch(loginUser(input.email, input.password));
    setInput(initial);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, alert, dispatch]);
  return (
    <>
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className="loginFormComp"
      >
        <label htmlFor="UserID" className="loginFormLabel">
          UserID
        </label>
        <input
          type="email"
          name="email"
          id="UserID"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="passKey" className="loginFormLabel">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="passKey"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">login</button>
      </form>
    </>
  );
}

export default LoginForm;
