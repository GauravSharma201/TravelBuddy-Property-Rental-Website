import React, { useState, useRef } from 'react'
import './testingComp.css'
import { Country } from 'country-state-city'
import { KeyboardArrowDown } from '@material-ui/icons'

function TestingComp() {
  let [testDis, setTestDis] = useState(false)
  let [country, setCountry] = useState('')
  //   let [searchTerm, setSearchTerm] = useState('')
  let countryOptSubCont = useRef(null)
  let handleSelectOpt = () => {
    setTestDis(!testDis)
    countryOptSubCont.current.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  //   let handleInputSearch = (e) => {
  //     let valueSearch = e.target.value
  //     setSearchTerm(valueSearch)
  //     valueSearch = valueSearch.toLowerCase()
  //     console.log(valueSearch)
  //   }
  return (
    <div>
      <div className="countrySelec" onClick={() => handleSelectOpt()}>
        {country || `country`} <KeyboardArrowDown />
      </div>
      <div
        className={testDis ? 'optionContCountry actvTest' : 'optionContCountry'}
        ref={countryOptSubCont}
      >
        <div className="optionCountrySubCont">
          {/* <div className="optionSearchCont">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleInputSearch(e)}
              className="optionSearchInput"
            />
          </div> */}
          {Country &&
            Country.getAllCountries().map((elem) => (
              <div
                className="countryOptions"
                key={elem.isoCode}
                onClick={() => setCountry(elem.name)}
              >
                {elem.name}
              </div>
            ))}
        </div>
      </div>
      <div>state</div>
      <div>city</div>
    </div>
  )
}

export default TestingComp
