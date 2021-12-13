import { combineReducers } from 'redux'
import {
  userReducer,
  forgotPasswordReducer,
  updateUsrProfReducer,
  updateUsrPassReducer,
} from './userReducer'
import { addToCartReducer } from './cartreducer'
import {
  propertiesReducer,
  createPropReducer,
  getMyPropReducer,
} from './propertiesReducer'
import {
  PropertyDetReducer,
  createReivewReducer,
  myPropUpdateReducer,
} from './propertyDetReducer'
import {
  bookingReducer,
  getMyBookingsReducer,
  getMyPropBookReducer,
} from './bookingRed'

const rootReducer = combineReducers({
  user: userReducer,
  properties: propertiesReducer,
  property: PropertyDetReducer,
  forgotPass: forgotPasswordReducer,
  createdRev: createReivewReducer,
  updateUsrProf: updateUsrProfReducer,
  updateUsrPass: updateUsrPassReducer,
  cart: addToCartReducer,
  bookings: bookingReducer,
  myBookings: getMyBookingsReducer,
  createdProperty: createPropReducer,
  myProperties: getMyPropReducer,
  myPropBooking: getMyPropBookReducer,
  myPropUpdate: myPropUpdateReducer,
})

export default rootReducer
