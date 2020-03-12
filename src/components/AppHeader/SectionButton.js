import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const BACKGROUND_IMAGE = require("../../res/background.jpg")

function _SectionButton(props) {
  return (
    <div className={props.className} style={props.style}>
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

    background-image: url(${BACKGROUND_IMAGE});

    .link {
    }

    .image {
      margin: -5px;
    }
  }
`

export default SectionButton
