import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Constants from "../../constants"

const BACKGROUND_IMAGE = require("../../res/background.jpg")

function _SectionButton(props) {
  return (
    <div
      className={props.className}
      style={{
        ...props.style,
        backgroundImage: "url(" + BACKGROUND_IMAGE + ")",
        backgroundPositionX: props.position.x * 2,
        backgroundPositionY: props.position.y * 2,
        backgroundSize: "contain",
      }}
    >
      <Link className="link" to={props.route} onClick={props.handleClick}>
        <img className="image" src={props.image} alt="ASSET" />
      </Link>
    </div>
  )
}

const SectionButton = styled(_SectionButton)`
   {
    ${"" /* removes highlight on mobiles */}
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;

    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    ${"" /* max-width: 235px; */}
    ${"" /* max-height: 235px; */}

    min-width: 100px;
    min-height: 100px;

    @media only screen and (max-width: ${Constants.MOBILE_THRESHOLD}px) {
      min-width: 50px;
      min-height: 50px;
    }

    .link {
    }

    .image {
      margin: -7px;
    }
  }
`

export default SectionButton
