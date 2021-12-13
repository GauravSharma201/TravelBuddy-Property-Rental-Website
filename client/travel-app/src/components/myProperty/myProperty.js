import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Launch, Edit } from "@material-ui/icons";
import {
  getMyPropertiesAct,
  getMyPropClearErr,
} from "../../action/propertiesAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import "./myProperty.css";
// import "./myPropertySys.css";

function MyProperty() {
  let dispatch = useDispatch();
  let { myProperties, myPropError } = useSelector(
    (state) => state.myProperties
  );
  let alert = useAlert();
  let matches1920 = useMediaQuery("(max-width:1920px)");
  let matches1366 = useMediaQuery("(max-width:1366px)");
  let fontSz = "1.5rem";
  if (matches1920) {
    fontSz = "2rem";
  }
  if (matches1366) {
    fontSz = "1.5rem";
  }
  let rows = [];
  let columns = [
    {
      field: "id",
      headerName: "Property",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Title",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/me/myProperty/${params.getValue(params.id, "id")}`}
              className="dataGridActions"
            >
              <Launch style={{ fontSize: fontSz }} />
            </Link>
            <Link
              to={`/me/myProperty/edit/${params.getValue(params.id, "id")}`}
            >
              <Edit style={{ fontSize: fontSz }} />
            </Link>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getMyPropertiesAct());
    if (myPropError) {
      alert.error(myPropError);
      dispatch(getMyPropClearErr());
    }
  }, [dispatch, myPropError, alert]);

  myProperties &&
    myProperties.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.title,
        price: item.price,
        category: item.category,
      });
    });

  return (
    <>
      <section className="userProfileSection">
        <div className="propListCont">
          <h1 id="propListHead">PROPERTIES</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="propListTable"
            autoHeight
          />
        </div>
      </section>
    </>
  );
}

export default MyProperty;
