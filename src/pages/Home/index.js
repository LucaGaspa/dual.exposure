import React, { useState } from "react"
import styled from "styled-components"

import emailIcon from "../../res/email-icon.svg"

function _Home(props) {
  const [isContactUsVisible, setIsContactUsVisible] = useState(false)

  function onContactUs() {
    setIsContactUsVisible(!isContactUsVisible)
  }

  return (
    <div className={props.className}>
      <div className="home-container">
        {/* <h2>Dual Exposure Studio</h2> */}
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
            <img className="email-icon" src={emailIcon} />
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
        margin-top: 20px;
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
        background-image: linear-gradient(to right, #e6e6e6, #595959);
      }

      .hide {
        height: 100%;
        width: 70px;
        background-color: #e6e6e6;
        transition: width 400ms ease-out;
      }

      .show {
        height: 100%;
        width: 0px;
        background-color: #e6e6e6;
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

      .email-icon {
        height: 30px;
        width: 30px;
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
        background-image: linear-gradient(to left, #e6e6e6, #595959);
      }

      .hide-sep-email {
        height: 100%;
        width: 100%;
        background-color: #e6e6e6;
      }

      .show-sep-email {
        height: 100%;
        width: 290px;
        background-color: #e6e6e6;
      }
    }
  }
`

export default Home
