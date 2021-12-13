import React, { useEffect } from 'react'
import './slider.css'
function Slider(props) {
  // let setSlides = () => {
  //   let slide1 = document.getElementById(props.ID.s1)
  //   slide1.style.transform = 'translate3d(16%, 0, -199px)'
  //   slide1.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'

  //   let slide2 = document.getElementById(props.ID.s2)
  //   slide2.style.transform = 'translate3d(32%, 0, -446px)'
  //   slide2.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'

  //   let slide3 = document.getElementById(props.ID.s3)
  //   slide3.style.transform = 'translate3d(-32%, 0, -446px)'
  //   slide3.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'

  //   let slide4 = document.getElementById(props.ID.s4)
  //   slide4.style.transform = 'translate3d(-16%, 0, -199px)'
  //   slide4.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'

  //   let slide5 = document.getElementById(props.ID.s5)
  //   slide5.style.transform = 'translate3d(0%, 0, 0px)'
  //   slide5.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
  // }
  let handleSlider = (e) => {
    let targetID = e.target.id

    if (targetID === props.ID.s1) {
      let slide1 = document.getElementById(props.ID.s1)
      let slide2 = document.getElementById(props.ID.s2)
      let slide3 = document.getElementById(props.ID.s3)
      let slide4 = document.getElementById(props.ID.s4)
      let slide5 = document.getElementById(props.ID.s5)
      slide1.style.transform = 'translate3d(0%, 0, 0px)'
      slide1.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
      slide2.style.transform = 'translate3d(16%, 0, -199px)'
      slide2.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
      slide3.style.transform = 'translate3d(32%, 0, -446px)'
      slide3.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
      slide4.style.transform = 'translate3d(-32%, 0, -446px)'
      slide4.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
      slide5.style.transform = 'translate3d(-16%, 0, -199px)'
      slide5.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
    } else if (targetID === props.ID.s2) {
      let slide1 = document.getElementById(props.ID.s1)
      let slide2 = document.getElementById(props.ID.s2)
      let slide3 = document.getElementById(props.ID.s3)
      let slide4 = document.getElementById(props.ID.s4)
      let slide5 = document.getElementById(props.ID.s5)
      slide1.style.transform = 'translate3d(-16%, 0, -199px)'
      slide1.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
      slide2.style.transform = 'translate3d(0%, 0, 0px)'
      slide2.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
      slide3.style.transform = 'translate3d(16%, 0, -199px)'
      slide3.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
      slide4.style.transform = 'translate3d(32%, 0, -446px)'
      slide4.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
      slide5.style.transform = 'translate3d(-32%, 0, -446px)'
      slide5.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
    } else if (targetID === props.ID.s3) {
      let slide1 = document.getElementById(props.ID.s1)
      let slide2 = document.getElementById(props.ID.s2)
      let slide3 = document.getElementById(props.ID.s3)
      let slide4 = document.getElementById(props.ID.s4)
      let slide5 = document.getElementById(props.ID.s5)
      slide1.style.transform = 'translate3d(-32%, 0, -446px)'
      slide1.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
      slide2.style.transform = 'translate3d(-16%, 0, -199px)'
      slide2.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
      slide3.style.transform = 'translate3d(0%, 0, 0px)'
      slide3.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
      slide4.style.transform = 'translate3d(16%, 0, -199px)'
      slide4.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
      slide5.style.transform = 'translate3d(32%, 0, -446px)'
      slide5.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
    } else if (targetID === props.ID.s4) {
      let slide1 = document.getElementById(props.ID.s1)
      let slide2 = document.getElementById(props.ID.s2)
      let slide3 = document.getElementById(props.ID.s3)
      let slide4 = document.getElementById(props.ID.s4)
      let slide5 = document.getElementById(props.ID.s5)
      slide1.style.transform = 'translate3d(32%, 0, -446px)'
      slide1.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
      slide2.style.transform = 'translate3d(-32%, 0, -446px)'
      slide2.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'
      slide3.style.transform = 'translate3d(-16%, 0, -199px)'
      slide3.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
      slide4.style.transform = 'translate3d(0%, 0, 0px)'
      slide4.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
      slide5.style.transform = 'translate3d(16%, 0, -199px)'
      slide5.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'
    } else if (targetID === props.ID.s5) {
      let slide1 = document.getElementById(props.ID.s1)
      slide1.style.transform = 'translate3d(16%, 0, -199px)'
      slide1.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'

      let slide2 = document.getElementById(props.ID.s2)
      slide2.style.transform = 'translate3d(32%, 0, -446px)'
      slide2.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'

      let slide3 = document.getElementById(props.ID.s3)
      slide3.style.transform = 'translate3d(-32%, 0, -446px)'
      slide3.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'

      let slide4 = document.getElementById(props.ID.s4)
      slide4.style.transform = 'translate3d(-16%, 0, -199px)'
      slide4.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'

      let slide5 = document.getElementById(props.ID.s5)
      slide5.style.transform = 'translate3d(0%, 0, 0px)'
      slide5.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
    }
  }
  useEffect(() => {
    if (props) {
      let slide1 = document.getElementById(props.ID.s1)
      slide1.style.transform = 'translate3d(16%, 0, -199px)'
      slide1.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'

      let slide2 = document.getElementById(props.ID.s2)
      slide2.style.transform = 'translate3d(32%, 0, -446px)'
      slide2.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'

      let slide3 = document.getElementById(props.ID.s3)
      slide3.style.transform = 'translate3d(-32%, 0, -446px)'
      slide3.style.boxShadow = '0.03em 0.03em 0.3em 0.2em #0000004a'

      let slide4 = document.getElementById(props.ID.s4)
      slide4.style.transform = 'translate3d(-16%, 0, -199px)'
      slide4.style.boxShadow = '0.1em 0.1em 0.3em 0.1em #00000069'

      let slide5 = document.getElementById(props.ID.s5)
      slide5.style.transform = 'translate3d(0%, 0, 0px)'
      slide5.style.boxShadow = '0.2em 0.2em 0.5em 0.2em #00000078'
    }
  }, [props])
  return (
    <>
      <div className="slider">
        <img
          src={props.ID.i1}
          alt=""
          className="img slide"
          id={props.ID.s1}
          onClick={(e) => {
            return handleSlider(e)
          }}
        />
        <img
          src={props.ID.i2}
          alt=""
          className="img slide"
          id={props.ID.s2}
          onClick={(e) => {
            return handleSlider(e)
          }}
        />
        <img
          src={props.ID.i3}
          alt=""
          className="img slide"
          id={props.ID.s3}
          onClick={(e) => {
            return handleSlider(e)
          }}
        />
        <img
          src={props.ID.i4}
          alt=""
          className="img slide"
          id={props.ID.s4}
          onClick={(e) => {
            return handleSlider(e)
          }}
        />
        <img
          src={props.ID.i5}
          alt=""
          className="img slide"
          id={props.ID.s5}
          onClick={(e) => {
            return handleSlider(e)
          }}
        />
      </div>
    </>
  )
}

export default Slider
