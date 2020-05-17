import React, { useState } from "react"
import styled from "styled-components"

import Constants from "../../constants"
import emailIcon from "../../res/email-icon.svg"
import instagramIcon from "../../res/instagram.png"

function _Home(props) {
  return (
    <div className={props.className}>
      <div className="home-container">
        <div className="contact-us">
          <img className="email-icon" src={emailIcon} alt="E" />
          <div className="contact-text">dual.exposure.studio@gmail.com</div>
          <img className="instagram-icon" src={instagramIcon} alt="E" />
          <div className="contact-text">@dual.exposure</div>
        </div>
      </div>
    </div>
  )
}

const Home = styled(_Home)`
   {
    .home-container {
      .contact-us {
        cursor: pointer;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;

        @media only screen and (max-width: ${Constants.MOBILE_THRESHOLD}px) {
          margin-top: 100px;

          flex-direction: column;
        }
      }

      .email-icon {
        height: 30px;
        width: 30px;

        @media only screen and (max-width: ${Constants.MOBILE_THRESHOLD}px) {
          margin-top: 50px;
        }
      }

      .contact-text {
        font-size: 18px;
        font-weight: 500;
        margin-left: 5px;

        @media only screen and (max-width: ${Constants.MOBILE_THRESHOLD}px) {
          margin-top: 5px;
          margin-left: 0px;
        }
      }

      .instagram-icon {
        height: 30px;
        width: 30px;
        margin-left: 100px;

        @media only screen and (max-width: ${Constants.MOBILE_THRESHOLD}px) {
          margin-top: 50px;
          margin-left: 0px;
        }
      }
    }
  }
`

export default Home
