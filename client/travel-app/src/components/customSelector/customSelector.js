import React, { useState, useEffect } from "react";
import "./customSelector.css";
// import "./customSelectorSys.css";
import { useMediaQuery } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
function CustomSelector({ value, onChange, options, label, id }) {
  let [selDis, setSelDis] = useState(false);
  let [query, setQuery] = useState("");
  let customSelWindow = document.getElementById(`customSelWin${id}`);
  let customSelTitle = document.getElementById(`customSelTitle${id}`);
  let inputSearch = document.getElementById(`searchInput${id}`);
  let matches414 = useMediaQuery("(max-width:414px)");
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fntSzArr = "1.5rem";
  if (matches1920) {
    fntSzArr = "2.2rem";
  }
  if (matches1366) {
    fntSzArr = "1.5rem";
  }
  if (matches414) {
    fntSzArr = "3rem";
  }
  let handleCusSelDis = () => {
    if (options) {
      setSelDis(!selDis);
      setQuery("");
      document.getElementById(`customSelWin${id}`).scrollTo(0, 0);
    }
  };
  let filter = (options) => {
    return options.filter(
      (elem) => elem[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  useEffect(() => {
    let handler = (event) => {
      if (
        event.target !== customSelWindow &&
        event.target !== customSelTitle &&
        event.target !== inputSearch
      ) {
        setSelDis(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [customSelWindow, customSelTitle, selDis, inputSearch]);
  return (
    <>
      <div className="customSelectorCont">
        {id ? (
          <div
            className="cutomSelectorCntrl"
            onClick={() => handleCusSelDis()}
            id={`customSelTitle${id}`}
          >
            {value || `select ${id}...`}{" "}
            <KeyboardArrowDown style={{ fontSize: fntSzArr }} />
          </div>
        ) : (
          ""
        )}
        {options && id ? (
          <div
            className={
              selDis
                ? "customSelectorOptWin actvCustomSelWin"
                : "customSelectorOptWin"
            }
            id={`customSelWin${id}`}
          >
            <div className="customSelectorOptCont">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id={`searchInput${id}`}
                className="customSelectorOpt customSelectorInpOpt"
                placeholder="search..."
              />
              {filter(options).map((elem, index) => (
                <span
                  className="customSelectorOpt"
                  onClick={() => {
                    onChange(elem);
                    handleCusSelDis();
                  }}
                  key={`${id}${index}`}
                >
                  {elem[label]}
                </span>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CustomSelector;
