import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, updateUserPass } from "../../action/userAction";
import { UPDATE_PASS_RESET } from "../../action/actionTypes";
import "./updateUserPass.css";
// import "./updateUserPassSys.css";
function UpdateUserPass() {
  let dispatch = useDispatch();
  let alert = useAlert();
  let { isPassUpdated, updPassError } = useSelector(
    (state) => state.updateUsrPass
  );
  let [oldPass, setOldPass] = useState("");
  let [newPass, setNewPass] = useState("");
  let [confirmPass, setConfirmPass] = useState("");
  let handlePassSubmit = (e) => {
    e.preventDefault();
    let myPass = new FormData();
    myPass.set("oldPassword", oldPass);
    myPass.set("confirmPassword", confirmPass);
    myPass.set("newPassword", newPass);
    dispatch(updateUserPass(myPass));
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };
  useEffect(() => {
    if (updPassError) {
      alert.error(updPassError);
      dispatch(clearError());
    }
    if (isPassUpdated) {
      alert.success("user Password updated successfully");
      dispatch({ type: UPDATE_PASS_RESET });
    }
  }, [alert, updPassError, dispatch, isPassUpdated]);
  return (
    <section className="updatePassSec">
      <div className="updatePassMod">
        <form
          action=""
          className="editPassForm"
          onSubmit={(e) => handlePassSubmit(e)}
        >
          <label htmlFor="oldPassEdit" className="updUserPassLabel">
            old Password
          </label>
          <input
            type="password"
            id="oldPassEdit"
            name="oldPassEdit"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <label htmlFor="newPassEdit" className="updUserPassLabel">
            new Password
          </label>
          <input
            type="password"
            id="newPassEdit"
            name="newPassEdit"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <label htmlFor="confirmPassEdit" className="updUserPassLabel">
            confirm Password
          </label>
          <input
            type="password"
            id="confirmPassEdit"
            name="confirmPassEdit"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <button type="submit">change</button>
        </form>
      </div>
    </section>
  );
}

export default UpdateUserPass;
