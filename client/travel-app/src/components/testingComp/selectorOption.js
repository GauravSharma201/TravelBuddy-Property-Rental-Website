import React, { useState } from 'react'
import './selectorOption.css'
function SelectorOption({ value, options, onChange }) {
  let [selDis, setSelDis] = useState(false)
  console.log('this is options we passed', options)
  return (
    <>
      <div className="selecOptionContTest">
        <div className="selectorCntrl" onClick={() => setSelDis(!selDis)}>
          {value ? value : 'select...'}
        </div>
        {options ? (
          <div
            className={
              selDis ? 'selectorOptionsWin actvSelCtrl' : 'selectorOptionsWin'
            }
          >
            <div className="selectorOptCont">
              {options.map((elem) => (
                <div
                  className="optToSelFrom"
                  onClick={() => {
                    onChange(elem.name)
                  }}
                >
                  {elem.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default SelectorOption
