import React from "react";
import "./footer.css";
// import "./footerSys.css";
import {
  Call,
  Facebook,
  Instagram,
  LinkedIn,
  YouTube,
  Twitter,
} from "@material-ui/icons";
import { useMediaQuery } from "@material-ui/core";
function Footer() {
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSz = "1.5rem";
  if (matches1920) {
    fntSz = "2rem";
  }
  if (matches1366) {
    fntSz = "1.5rem";
  }
  if (matches414) {
    fntSz = "2rem";
  }
  return (
    <>
      <footer id="footer">
        <div id="footTop" className="divCon">
          <Call style={{ fontSize: fntSz }} />{" "}
          <p className="phoneNumPara">1800-1299-100</p>
        </div>
        <div id="footCenter" className="divCon">
          <div id="divFirst">
            <span className="phoneNumPara">travel buddy</span>
          </div>
          <div>
            <span className="phoneNumPara">international holiday</span>
          </div>
          <div id="divThird">
            <span className="phoneNumPara">india holiday</span>
          </div>
          <div>
            <span className="phoneNumPara">foreign exchange</span>
          </div>
          <div id="divLast">
            <span className="phoneNumPara">visa</span>
          </div>
        </div>
        <div id="footBottom" className="divCon">
          <div>
            <span className="phoneNumPara">follow us</span>
          </div>
          <div>
            <Instagram className="footIcon insta" style={{ fontSize: fntSz }} />
          </div>
          <div>
            <Facebook className="footIcon fb" style={{ fontSize: fntSz }} />
          </div>
          <div>
            <Twitter className="footIcon twit" style={{ fontSize: fntSz }} />
          </div>
          <div>
            <YouTube className="footIcon youtube" style={{ fontSize: fntSz }} />
          </div>
          <div>
            <LinkedIn
              className="footIcon linkedIn"
              style={{ fontSize: fntSz }}
            />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
