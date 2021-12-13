import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  adminLoginAct,
  loadAdmin,
  clearAdminError,
} from '../../../action/userAction'
import { useAlert } from 'react-alert'
import './adminLogin.css'

const initial = {
  email: '',
  password: '',
}
function AdminLogin({ history }) {
  let { adminError, isAuthenticatedAdmin } = useSelector((state) => state.admin)
  let [input, setInput] = useState(initial)
  let alert = useAlert()
  let dispatch = useDispatch()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput(() => {
      return { ...input, [name]: value }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(adminLoginAct(input.email, input.password))
    setInput(initial)
  }
  dispatch(loadAdmin())
  useEffect(() => {
    if (adminError) {
      alert.error(adminError)
      dispatch(clearAdminError())
    }
    if (isAuthenticatedAdmin) {
      history.push('/admin/dashboard')
    }
  }, [adminError, alert, dispatch, isAuthenticatedAdmin, history])
  return (
    <>
      <section className="adminSection">
        <div className="adminLoginModal">
          <form
            action=""
            onSubmit={(e) => handleSubmit(e)}
            className="loginFormCompAdmin"
          >
            <label htmlFor="UserID">UserID</label>
            <input
              type="text"
              value={input.UserID}
              onChange={(e) => handleChange(e)}
              name="email"
              id="UserID"
            />
            <label htmlFor="passKey">Password</label>
            <input
              type="text"
              value={input.passKey}
              onChange={(e) => handleChange(e)}
              name="password"
              id="passKey"
            />
            <button type="submit">login</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default AdminLogin
