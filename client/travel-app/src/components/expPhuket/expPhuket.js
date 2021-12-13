import React, { useEffect } from "react";
import "./expPhuket.css";
// import "./expPhuketSys.css";
import Property from "../hotelProperty/hotelProperty";
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useAlert } from "react-alert";
import { clearError, getAllProperties } from "../../action/propertiesAction";
import Pagination from "../pagination/pagination";
import Filter from "../filter/filter";

function ExpPhuket({ country }) {
  let { error, loading, numOfPropr, resultPerPg, propertyArr } = useSelector(
    (state) => state.properties
  );
  let numOfPages = Math.ceil(numOfPropr / resultPerPg);
  let matches360 = useMediaQuery("(max-width:360px)");
  let matches414 = useMediaQuery("(max-width:414px)");
  let alert = useAlert();
  let dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (country) {
      dispatch(getAllProperties("", null, 0, [0, 500000], 1, 1, country));
    }
  }, [error, dispatch, alert, country]);
  return (
    <>
      <section id="expPhuket">
        <div className="subExpPhuket_Up">
          <h4>{numOfPropr || 0}</h4>
          <h1>stays</h1>
          {country && <Filter country={country} />}
        </div>
        <div className="subExpPhuket_Down">
          <div className="hotels">
            <div className="hotelListCont">
              {loading
                ? "loading"
                : propertyArr &&
                  propertyArr.map((elem, index) => {
                    return <Property key={`proper${index}`} prop={elem} />;
                  })}
            </div>
            <div className="pagination">
              <Pagination key={`pagination`} prop={numOfPages} />
            </div>
          </div>
          {matches360 ? (
            ""
          ) : matches414 ? (
            ""
          ) : (
            <div className="siteInfo">
              <div className="stickCont">
                <span>map</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ExpPhuket;
