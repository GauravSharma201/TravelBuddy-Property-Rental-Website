import React, { useState, useEffect } from 'react'
import SelectorOption from './selectorOption'
import DropDownMod from '../dropDownModal/dropDownMod'
import NumOfGuestSel from '../dropDownModal/numOfGuest/numOfGuestSel'
import { Rating } from '@material-ui/lab'
import './main.css'
function Main() {
  let [val, setVal] = useState(null)
  let [guest, setGuest] = useState(1)
  let [rating, setRating] = useState(0)
  let country = [
    { name: 'india' },
    { name: 'pakistan' },
    { name: 'bangladesh' },
    { name: 'bhutan' },
    { name: 'nepal' },
    { name: 'srilanka' },
  ]
  let ratingOpt = {
    size: 'medium',
    value: rating,
    readOnly: false,
    precision: 0.5,
  }
  useEffect(() => {
    console.log('this is guest', guest)
  }, [guest])
  return (
    <>
      <section className="mainSec">
        <h1>this is testing area...</h1>
        <span>{`our selected value is.."${val || 'null'}"`}</span>
        <SelectorOption
          value={val}
          onChange={(val) => {
            setVal(val)
          }}
          options={country}
        />
        <DropDownMod
          title={'title'}
          liArr={['hello', 'hello', 'hello', 'hello', 'hello']}
          fntSz={'1em'}
          modContID={'testId'}
          titleContID={'testTitle'}
        />
        <Rating
          {...ratingOpt}
          onChange={(event, newValue) => {
            setRating(newValue)
          }}
        />
        <NumOfGuestSel
          setNumGuest={(val) => {
            setGuest(val)
          }}
          properGuest={3}
          numGuest={guest}
        />
      </section>
    </>
  )
}

export default Main
