import React, { useState } from "react"
import styled from "styled-components"

function _Home(props) {
  const [isContactUsVisible, setIsContactUsVisible] = useState(false)

  function onContactUs() {
    setIsContactUsVisible(!isContactUsVisible)
  }

  return (
    <div className={props.className}>
      <div className="home-container">
        <h2>Dual Exposure Studio</h2>
        <div className="contact-us-container">
          <div className="contact-us" onClick={onContactUs}>
            Contact Us
          </div>
          <div className={"separator"}>
            <div className={isContactUsVisible ? "hide" : "show"}></div>
          </div>
          <div
            className={
              "form-container " + (isContactUsVisible ? "open" : "close")
            }
          >
            <div className={"email"}>dual.exposure.studio@gmail.com</div>
            <div className={"separator-email"}>
              <div className={isContactUsVisible ? "show" : "hide"}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Home = styled(_Home)`
   {
    .home-container {
      text-align: center;

      h2 {
        font-weight: 400;
        font-size: 32pt;
      }

      .contact-us-container {
        position: relative;
        display: inline-block;
        width: 500px;
      }

      .contact-us {
        cursor: pointer;
        margin-top: 3px;
        font-weight: 500;
      }

      .separator {
        display: inline-block;
        align-self: center;
        width: 70px;
        height: 1px;
        margin-left: 20px;
        margin-bottom: 10px;
        background-image: linear-gradient(to right, white, #262626);
      }

      .hide {
        height: 100%;
        width: 70px;
        background-color: #fff;
        transition: width 400ms ease-out;
      }

      .show {
        height: 100%;
        width: 0px;
        background-color: #fff;
        transition: width 1000ms ease-out 400ms;
      }

      .form-container {
        overflow: hidden;
        display: inline-block;
        position: absolute;
        left: 310px;
        top: 0;
      }

      .open {
        width: 290px;
        transition: width 1000ms ease-out 400ms;
      }

      .close {
        width: 0px;
        transition: width 400ms ease-in;
      }

      .email {
        font-size: 18px;
        font-weight: 500;
      }

      .separator-email {
        display: inline-block;
        align-self: center;
        width: 290px;
        height: 1px;
        margin-left: 10px;
        margin-bottom: 10px;
        background-image: linear-gradient(to left, white, #262626);
      }

      .hide-sep-email {
        height: 100%;
        width: 100%;
        background-color: #fff;
      }

      .show-sep-email {
        height: 100%;
        width: 290px;
        background-color: #fff;
      }
    }
  }
`

export default Home
