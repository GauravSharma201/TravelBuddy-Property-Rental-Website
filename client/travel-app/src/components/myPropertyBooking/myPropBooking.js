import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getMyPropBookingAct,
  clearGetMyPropBookErrAct,
} from '../../action/bookingAct'
import { DataGrid } from '@material-ui/data-grid'
import { useAlert } from 'react-alert'
import './myPropBooking.css'

function MyPropBooking({ match }) {
  let { myPropBookings, myPropBookErr } = useSelector(
    (state) => state.myPropBooking
  )
  let dispatch = useDispatch()
  let alert = useAlert()
  let rows = []
  let columns = [
    {
      field: 'id',
      headerName: 'Booking',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'user',
      headerName: 'User',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: 'checkIn',
      headerName: 'CheckIn',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'checkOut',
      headerName: 'CheckOut',
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: 'guests',
      headerName: 'Guests',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: 'totalAmount',
      flex: 0.3,
      headerName: 'TotalAmount',
      minWidth: 200,
      type: 'number',
    },
  ]
  useEffect(() => {
    if (myPropBookErr) {
      alert.error(myPropBookErr)
      dispatch(clearGetMyPropBookErrAct())
    }
    dispatch(getMyPropBookingAct(match.params.id))
  }, [dispatch, myPropBookErr, alert, match])

  myPropBookings &&
    myPropBookings.forEach((item) => {
      rows.push({
        id: item._id,
        user: item.userId,
        name: item.name,
        checkIn: item.checkIn,
        checkOut: item.checkOut,
        contact: item.phoneNumber,
        guests: item.guests,
        totalAmount: item.totalPrice,
      })
    })
  return (
    <>
      <section className="userProfileSection">
        <div className="propListCont">
          <h1 id="propBookListHead">{`PROPERTY:  ${match.params.id}`}</h1>

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
  )
}

export default MyPropBooking
