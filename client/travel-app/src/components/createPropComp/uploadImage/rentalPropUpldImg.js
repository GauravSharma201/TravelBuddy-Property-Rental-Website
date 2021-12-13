import React from "react";
import { PhotoCamera } from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";

function RentalPropUpldImg({ upldImgVal, onChange, settNull }) {
  let matches414 = useMediaQuery("(max-width:414px)");
  let fntSz = "1.5rem";
  if (matches414) {
    fntSz = "2.5rem";
  }
  let handleImgUpld = (e) => {
    let files = e.target.files;
    let length = files.length;

    if (e.target.files && length >= 5) {
      const files = Array.from(e.target.files);

      settNull();
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            let val = reader.result;
            onChange(val);
          }
        };

        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <>
      <div className="uploadImgRentProp">
        <div className="rentPropUpldedImg">
          <div className="rentPropupldImgArea">
            <img
              src={upldImgVal && upldImgVal[0]}
              alt="ulpdImg"
              className="upldedImg"
            />
          </div>
          <div className="rentPropupldImgArea">
            <img
              src={upldImgVal && upldImgVal[1]}
              alt="ulpdImg"
              className="upldedImg"
            />
          </div>
          <div className="rentPropupldImgArea">
            <img
              src={upldImgVal && upldImgVal[2]}
              alt="ulpdImg"
              className="upldedImg"
            />
          </div>
          <div className="rentPropupldImgArea">
            <img
              src={upldImgVal && upldImgVal[3]}
              alt="ulpdImg"
              className="upldedImg"
            />
          </div>
          <div className="rentPropupldImgArea">
            <img
              src={upldImgVal && upldImgVal[4]}
              alt="ulpdImg"
              className="upldedImg"
            />
          </div>
        </div>
        <div className="upldImgInpRentProp">
          <label htmlFor="rentalPropuploadedImgs">
            <PhotoCamera style={{ fontSize: fntSz }} />
          </label>
          <input
            type="file"
            multiple
            id="rentalPropuploadedImgs"
            accept="image/*"
            onChange={(e) => {
              handleImgUpld(e);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default RentalPropUpldImg;
