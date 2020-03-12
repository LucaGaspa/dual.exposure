import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BACKGROUND_IMAGE = require("../../res/background.jpg")

function _SectionButton(props) {
  return (
    <div
      className={props.className}
      style={{
        ...props.style,
        backgroundImage: "url(" + BACKGROUND_IMAGE + ")",
        backgroundPositionX: props.position.x,
        backgroundPositionY: props.position.y
      }}
    >
      <Link className="link" to={props.route} onClick={props.handleClick}>
        <img className="image" src={props.image} />
      </Link>
    </div>
  )
}

const SectionButton = styled(_SectionButton)`
   {
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    max-width: 235px;
    max-height: 235px;

    min-width: 135px;
    min-height: 135px;

    .link {
    }

    .image {
      margin: -7px;
    }
  }
`

export default SectionButton
