import './resetPassword.css'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearError, resetUserPass } from '../../action/userAction'

function ResetPassword({ match, history }) {
  let [newPass, setNewPass] = useState('')
  let [confirmPass, setConfirmPass] = useState('')
  let alert = useAlert()
  let { success, error } = useSelector((state) => state.forgotPass)
  let dispatch = useDispatch()
  let handleSubmit = (e) => {
    e.preventDefault()
    let myPass = new FormData()
    myPass.set('password', newPass)
    myPass.set('confirmPassword', confirmPass)
    dispatch(resetUserPass(myPass, match.params.token))
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }
    if (success) {
      alert.success('password reset is successfull')
      history.push('/')
    }
  }, [alert, error, success, dispatch, history])
  return (
    <section className="resetPasswordSec">
      <div className="resetPassCont">
        <form
          action=""
          className="resetPassForm"
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
          <label htmlFor="newPassReset">new password</label>
          <input
            type="text"
            id="newPassReset"
            name="newPassReset"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <label htmlFor="confirmPassReset">confirm password</label>
          <input
            type="text"
            id="confirmPassReset"
            name="confirmPassReset"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <button type="submit">set password</button>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword
