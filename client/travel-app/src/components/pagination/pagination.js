import React, { useState, useEffect } from "react";
import "./pagination.css";
// import "./paginationSys.css";
import { getAllProperties } from "../../action/propertiesAction";
import { useDispatch } from "react-redux";

const Pagination = ({ prop }) => {
  let paginationArr = [];
  let dispatch = useDispatch();
  let [minPageValue, setMinPageValue] = useState(0);
  let [maxPageValue, setMaxPageValue] = useState(2);
  let [currentPage, setCurrentPage] = useState(1);
  let pushFunction = (prop, Arr) => {
    let i;
    for (i = 1; i <= prop; i++) {
      Arr.push(i);
    }
    return Arr;
  };
  let handleNext = () => {
    if (maxPageValue < prop - 1) {
      setMinPageValue(minPageValue + 1);
      setMaxPageValue(maxPageValue + 1);
    }
    if (currentPage < prop) {
      setCurrentPage(currentPage + 1);
    }
  };
  let handlePrevious = () => {
    if (minPageValue > 0) {
      setMinPageValue(minPageValue - 1);
      setMaxPageValue(maxPageValue - 1);
    }
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };
  let handleCurrentPage = (elem) => {
    setCurrentPage(elem);
  };
  paginationArr = pushFunction(prop, paginationArr);
  useEffect(() => {
    dispatch(getAllProperties("", null, 0, [0, 500000], currentPage));
  }, [currentPage, dispatch]);
  return (
    <>
      {prop ? (
        <div className="paginationList">
          <div className="previous" onClick={() => handlePrevious()}>
            prev
          </div>
          {prop <= 3
            ? paginationArr.map((elem, index) => (
                <li
                  key={`paginArr${index}`}
                  onClick={() => handleCurrentPage(elem)}
                >
                  {elem}
                </li>
              ))
            : paginationArr.map((elem, index) =>
                index >= minPageValue && index <= maxPageValue ? (
                  <li
                    key={`paginCurr${index}`}
                    onClick={() => handleCurrentPage(elem)}
                  >
                    {elem}
                  </li>
                ) : null
              )}
          <div className="previous" onClick={() => handleNext()}>
            next
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
