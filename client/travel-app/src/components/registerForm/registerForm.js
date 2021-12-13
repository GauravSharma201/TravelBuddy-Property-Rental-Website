import React, { useState, useEffect } from "react";
import { registerUser, clearError } from "../../action/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./registerForm.css";
// import "./registerFormSys.css";
import { PhotoCamera } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";

let initialState = {
  email: "",
  password: "",
  name: "",
  address: "",
};
function RegisterForm() {
  let [input, setInput] = useState(initialState);
  let [avatar, setAvatar] = useState(
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  );
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");

  let fntSz = "1.5rem";
  if (matches1920) {
    fntSz = "2rem";
  }
  if (matches414) {
    fntSz = "3rem";
  }
  let [avatarPreview, setAvatarPreview] = useState(
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
  );
  let dispatch = useDispatch();
  let alert = useAlert();
  let { error } = useSelector((state) => state.user);
  let handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (e.target.name === "avatar") {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setInput(() => {
        return { ...input, [name]: value };
      });
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    let myForm = new FormData();
    myForm.set("name", input.name);
    myForm.set("email", input.email);
    myForm.set("password", input.password);
    myForm.set("address", input.address);
    myForm.set("avatar", avatar);
    let myData = {
      name: input.name,
      email: input.email,
      password: input.password,
      address: input.address,
      avatar: avatar,
    };
    dispatch(registerUser(myData));
    setInput(initialState);
    setAvatarPreview(
      "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    );
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch, alert]);
  return (
    <>
      <form
        action=""
        className="regForm"
        encType="multipart/formData"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="regName" className="registerFormLabel">
          name
        </label>
        <input
          type="text"
          id="regName"
          name="name"
          value={input.name}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="regEmail" className="registerFormLabel">
          email
        </label>
        <input
          type="text"
          id="regEmail"
          name="email"
          value={input.email}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="regPassword" className="registerFormLabel">
          password
        </label>
        <input
          type="password"
          id="regPassword"
          name="password"
          value={input.password}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="regAddress" className="registerFormLabel">
          address
        </label>
        <input
          type="text"
          id="regAddress"
          name="address"
          value={input.address}
          onChange={(e) => handleChange(e)}
        />
        <div className="regFormImgUpld">
          <img src={avatarPreview} alt="" className="regImgPreview" />
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            style={{ fontSize: 0, height: 0, padding: 0, width: 0 }}
            onChange={handleChange}
          />
          <label htmlFor="avatar">
            <PhotoCamera style={{ fontSize: fntSz }} />
          </label>
        </div>
        <button type="submit">register</button>
      </form>
    </>
  );
}

export default RegisterForm;
