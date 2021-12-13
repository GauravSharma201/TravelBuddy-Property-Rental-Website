import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/home'
import ExpPhuket from './components/expPhuket/expPhuket.js'
import { loadUser } from './action/userAction'
import { useDispatch } from 'react-redux'
import { store } from './index'
import PropertyDetail from './components/propertyDetail/propertyDetail'
import UserProfile from './components/userProfile/userProfile'
import UpdateUser from './components/updateUser/updateUser'
import UpdateUserPass from './components/updateUserPass/updateUserPass'
import ResetPassword from './components/resetPassword/resetPassword'
import Cart from './components/cart/cart'
import BookingPayment from './components/payment/bookingPayment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import RentProperty from './components/rentProperty/rentProperty'
import Main from './components/testingComp/main'
import MyProperty from './components/myProperty/myProperty'
import MyPropBooking from './components/myPropertyBooking/myPropBooking'
// import EditMyProp from './components/editMyProp/editMyProp'
import ProtectedRoute from './components/route/protectedRoute'
import EditPropTesting from './components/testingComp/editPropTesting/editPropTesting'

function App() {
  let dispatch = useDispatch()
  let [stripeApiKey, setStripeApiKey] = useState('')

  let getStripeApiKey = async () => {
    let { data } = await axios.get('/stripeApiKey')
    console.log('this is stripe data',data)
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    store.dispatch(loadUser())
    getStripeApiKey()
  }, [dispatch])
  return (
    <>
      <Router>
        <Route key={'Header'} path="/" component={Header} />
        <Route key={'Home'} exact path="/" component={Home} />
        <Route
          key={'ExpPhuket'}
          exact
          path="/thailand/explore"
          render={(props) => <ExpPhuket {...props} country={'Thailand'} />}
        />
        <Route
          key={'ExpPhuketGreece'}
          exact
          path="/greece/explore"
          render={(props) => <ExpPhuket {...props} country={'Greece'} />}
        />
        <Route
          key={'ExpPhuketMaurit'}
          exact
          path="/mauritius/explore"
          render={(props) => <ExpPhuket {...props} country={'Mauritius'} />}
        />
        <Route
          key={'PropertyDetail'}
          exact
          path="/property/:id"
          component={PropertyDetail}
        />
        <ProtectedRoute
          key={'UserProfile'}
          exact
          path="/me"
          component={UserProfile}
        />
        <ProtectedRoute
          key={'UpdateUser'}
          exact
          path="/me/updateUser"
          component={UpdateUser}
        />
        <ProtectedRoute
          key={'UpdateUserPass'}
          exact
          path="/me/password"
          component={UpdateUserPass}
        />
        <ProtectedRoute
          key={'ResetPassword'}
          exact
          path="/password/reset/:token"
          component={ResetPassword}
        />
        <ProtectedRoute
          key={'RentProperty'}
          exact
          path="/me/rentProperty"
          component={RentProperty}
        />
        <ProtectedRoute
          key={'myProperty'}
          exact
          path="/me/myProperty"
          component={MyProperty}
        />
        <ProtectedRoute
          key={'myPropBooking'}
          exact
          path="/me/myProperty/:id"
          component={MyPropBooking}
        />
        <ProtectedRoute
          key={'editMyProp'}
          exact
          path="/me/myProperty/edit/:id"
          component={EditPropTesting}
        />
        <Route key={'Main'} exact path="/main" component={Main} />
        {/* <Route
          key={'editPropTest'}
          exact
          path="/editPropTesting/:id"
          component={EditPropTesting}
        /> */}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute
              key={'bookingPayment'}
              exact
              path="/booking/payment/:id"
              component={BookingPayment}
            />
          </Elements>
        )}
        <Route key={'cart'} exact path="/cart" component={Cart} />
        <Route key={'Footer'} path="/" component={Footer} />
      </Router>
    </>
  )
}

export default App
