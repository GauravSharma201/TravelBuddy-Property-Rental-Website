import React from 'react'

function headerDropDown({prop}) {
    return (
        <>
      <span>{prop.title}</span>
      <div id={prop.id}
      className={prop.disply ? 'dropDown active' : 'dropDown'}>
        <ul>
          {prop.options.map((elem) => {
            return <li>{elem}</li>
          })}
        </ul>
      </div>
        </>
    )
}

export default headerDropDown
