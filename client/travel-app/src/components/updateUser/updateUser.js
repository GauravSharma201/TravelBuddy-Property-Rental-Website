import React, { useEffect, useState } from "react";
import "./updateUser.css";
// import "./updateUserSys.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, updateUserProf } from "../../action/userAction";
import { useAlert } from "react-alert";
import { clearError } from "../../action/userAction";
import { UPDATE_PROF_RESET } from "../../action/actionTypes";
import { PhotoCamera } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

function UpdateUser() {
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [avatar, setAvatar] = useState();
  let [avatarPrev, setAvatarPrev] = useState("");
  let [address, setAddress] = useState("");

  let alert = useAlert();
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let fntSz = "1.5rem";
  if (matches1920) {
    fntSz = "1.8rem";
  }
  if (matches1366) {
    fntSz = "1.5rem";
  }
  if (matches414) {
    fntSz = "2rem";
  }
  let { updError, isUpdated } = useSelector((state) => state.updateUsrProf);

  let { isAuthenticated, user } = useSelector((state) => state.user);

  let handleChange = (e) => {
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPrev(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("address", address);
    myForm.set("avatar", avatar);
    dispatch(updateUserProf(myForm));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setAddress(user.address);
      setName(user.name);
      setAvatarPrev(user.avatar.url);
      setEmail(user.email);
    }
    if (updError) {
      alert.error(updError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("user Profile updated successfully");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROF_RESET });
    }
  }, [user, alert, updError, dispatch, isUpdated, isAuthenticated]);
  return (
    <section className="updateUserSec">
      {isAuthenticated ? (
        <div className="updateUsrCont">
          <form
            action=""
            className="editForm"
            encType="multipart/formData"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="editName" className="updateUserLabel">
              name
            </label>
            <input
              type="text"
              id="editName"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="editFormInput"
            />
            <label htmlFor="editEmail" className="updateUserLabel">
              email
            </label>
            <input
              type="email"
              id="editEmail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="editFormInput"
            />
            <textarea
              id="editAddress"
              name="address"
              className="updUserAddInp"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address..."
              cols="30"
              rows="10"
            ></textarea>
            <div className="chooseImgUserUpd">
              <img src={avatarPrev} alt="" className="editImgPreview" />
              <label htmlFor="avatar" className="photoCameraLabel">
                <PhotoCamera style={{ fontSize: fntSz }} />
              </label>
              <input
                type="file"
                name="avatar"
                style={{ padding: 0 }}
                id="avatar"
                accept="image/*"
                className="updUserInpFile"
                onChange={handleChange}
              />
            </div>
            <button type="submit">Edit</button>
          </form>
          <Link to={"/me/password"} className="linkCss">
            update password
          </Link>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}

export default UpdateUser;
