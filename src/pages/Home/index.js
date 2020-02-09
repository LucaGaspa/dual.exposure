import React from "react"
import styled from "styled-components"

function _Home(props) {
  function onContactUs() {
    alert("ciao")
  }

  return (
    <div className={props.className}>
      <div className="home-container">
        <h2>Dual Exposure Studio</h2>
        <div className="contact-us" onClick={onContactUs}>
          Contact Us
        </div>
        <div className="separator"></div>
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

      .contact-us {
        cursor: pointer;
      }

      .separator {
        display: inline-block;
        align-self: center;
        width: 70px;
        height: 1px;
        margin-left: 20px;
        margin-bottom: 10px;
        background-image: linear-gradient(to right, white, black);
      }
    }
  }
`

export default Home
