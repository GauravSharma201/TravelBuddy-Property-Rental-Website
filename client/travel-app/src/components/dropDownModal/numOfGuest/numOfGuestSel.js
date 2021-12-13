import React, { useState, useEffect } from 'react'
import './numOfGuestSel.css'

function NumOfGuestSel({ setNumGuest, properGuest, numGuest }) {
  let [numGustDis, setNumGustDis] = useState(false)
  let numOfGuestCont = document.getElementById('numOfGuestCont')
  let numOfGuestBtn = document.getElementById('numOfGuestBtn')
  useEffect(() => {
    let handler = (event) => {
      if (event.target !== numOfGuestCont && event.target !== numOfGuestBtn) {
        setNumGustDis(false)
      }
    }
    document.addEventListener('click', handler)
    return () => {
      document.removeEventListener('click', handler)
    }
  }, [numOfGuestCont, numOfGuestBtn])
  return (
    <>
      <div
        className="numOfGuestBtn"
        onClick={() => setNumGustDis(!numGustDis)}
        id="numOfGuestBtn"
      >
        {`${numGuest} guests`}
      </div>
      <div
        className={numGustDis ? 'numOfGuestCont numGuestAct' : 'numOfGuestCont'}
        id="numOfGuestCont"
      >
        {properGuest ? (
          <>
            <span
              className="numOfGuestContSpan actNumGuest"
              onClick={() => {
                return setNumGuest(1)
              }}
            >
              1
            </span>
            <span
              onClick={() => {
                if (!(properGuest < 2)) {
                  setNumGuest(2)
                } else {
                  alert.error('number of guests limit exceeds')
                }
              }}
              className={
                !(properGuest < 2)
                  ? 'numOfGuestContSpan actNumGuest'
                  : 'numOfGuestContSpan'
              }
            >
              2
            </span>
            <span
              onClick={() => {
                if (!(properGuest < 3)) {
                  setNumGuest(3)
                } else {
                  alert.error('number of guests limit exceeds')
                }
              }}
              className={
                !(properGuest < 3)
                  ? 'numOfGuestContSpan actNumGuest'
                  : 'numOfGuestContSpan'
              }
            >
              3
            </span>
            <span
              onClick={() => {
                if (!(properGuest < 4)) {
                  setNumGuest(4)
                } else {
                  alert.error('number of guests limit exceeds')
                }
              }}
              className={
                !(properGuest < 4)
                  ? 'numOfGuestContSpan actNumGuest'
                  : 'numOfGuestContSpan'
              }
            >
              4
            </span>
            <span
              onClick={() => {
                if (!(properGuest < 5)) {
                  setNumGuest(5)
                } else {
                  alert.error('number of guests limit exceeds')
                }
              }}
              className={
                !(properGuest < 5)
                  ? 'numOfGuestContSpan actNumGuest'
                  : 'numOfGuestContSpan'
              }
            >
              5
            </span>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default NumOfGuestSel
