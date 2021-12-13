import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
  const { adminLoading, isAuthenticatedAdmin } = useSelector(
    (state) => state.admin
  )
  return (
    <Fragment>
      {adminLoading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticatedAdmin === false) {
              return <Redirect to="/admin" />
            }

            return <Component {...props} />
          }}
        />
      )}
    </Fragment>
  )
}

export default ProtectedRouteAdmin
