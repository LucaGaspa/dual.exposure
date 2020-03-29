import React, { useState, useEffect, useLayoutEffect } from "react"
import { Link } from "react-router-dom"
import { Layout } from "antd"
import styled from "styled-components"
import SectionButton from "./SectionButton"

import logo from "../../res/DE_Logo.svg"
import sign from "../../res/DE_Sign.svg"

const { Header } = Layout

const BACKGROUND_LANDSCAPES = require("../../res/landscapes.svg")
const BACKGROUND_STILL_LIFE = require("../../res/still-life.svg")
const BACKGROUND_PORTRAITS = require("../../res/portraits.svg")

const LOGO_MARGIN_TOP = 50

const LOGO_RATIO = 1.36
const SIGN_RATIO = 0.126

const MIN_LOGO_HEIGHT = 50
const MIN_LOGO_MARGIN_LEFT = 30
const MIN_LOGO_MARGIN_TOP = 25

const SECTION_MARGIN_TOP = 0

const SMALL_SCREEN = 480
// const MEDIUM_SCREEN = 675

function _AppHeader(props) {
  const isShrink = props.isShrink

  // mouse listener
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  // window size listener
  useLayoutEffect(() => {
    function updateSize(size) {
      if (!isShrink) {
        scaleUp(size)
      }
    }
    window.addEventListener("resize", updateSize)
  }, [])

  const updateMousePosition = ev => {
    let newX = (ev.clientX / window.innerWidth) * (isShrink ? 24 : 40)
    let newY = (ev.clientY / window.innerHeight) * (isShrink ? 24 : 40)
    setMousePosition({ x: newX, y: newY })
  }

  // mouse listener
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)

    return () => window.removeEventListener("mousemove", updateMousePosition)
  })

  // compute header shadow
  const [hasShadow, setHasShadow] = useState(isShrink)

  // set small dimension
  var logoHeight = MIN_LOGO_HEIGHT
  var logoMarginLeft = MIN_LOGO_MARGIN_LEFT
  var logoMarginTop = MIN_LOGO_MARGIN_TOP

  var sectionMarginTop = 0
  var sectionHeight = 100

  // take screen size
  const innerHeight = window.innerHeight
  const innerWidth = window.innerWidth

  const headerHeight = (innerHeight * 2) / 3
  const bigLogoHeight = headerHeight / 2
  const initialLeftMargin = (innerWidth - bigLogoHeight * LOGO_RATIO) / 2
  if (!isShrink) {
    // scale up

    logoHeight = bigLogoHeight
    logoMarginLeft = initialLeftMargin
    logoMarginTop = LOGO_MARGIN_TOP

    const usedHeight =
      LOGO_MARGIN_TOP +
      logoHeight +
      logoHeight * LOGO_RATIO * SIGN_RATIO + // sign height
      SECTION_MARGIN_TOP // section top margin

    sectionMarginTop = usedHeight
    sectionHeight = headerHeight - usedHeight + 50
  }

  // sign remains the same
  var signWidth = bigLogoHeight * LOGO_RATIO
  var signMarginTop = LOGO_MARGIN_TOP + bigLogoHeight

  // utils -> aka tell App to scale header
  function scaleDown() {
    props.changeState(true)
    if (!isShrink) {
      setTimeout(() => {
        setHasShadow(true)
      }, 1200)
    }
  }

  function scaleUp(size) {
    props.changeState(false, size)
    setHasShadow(false)
  }

  return (
    <Header className={props.className}>
      <div className={hasShadow ? " shadow" : ""}>
        <div
          // styles happens immediatly, while className comes in after when isShrink is changed
          // changing transition effect for the next click
          className={"logo " + (!isShrink ? "logo-wait" : "logo-immediate")}
          style={{
            marginTop: logoMarginTop,
            marginLeft: logoMarginLeft,
            height: logoHeight,
            width: logoHeight * LOGO_RATIO
          }}
        >
          <Link to="/" className="logo-link" onClick={scaleUp}>
            <img src={logo} className="logo-img" alt="LOGO" />
          </Link>
        </div>

        <div
          className={
            "sign-container " + (isShrink ? "sign-immediate" : "sign-wait")
          }
          style={{
            opacity: isShrink ? 0 : 1,
            width: signWidth,
            marginLeft: initialLeftMargin,
            marginTop: signMarginTop
          }}
        >
          <img className="sign" src={sign} alt="SIGN" />
        </div>

        <div className="sections">
          <SectionButton
            className={!isShrink ? "first" : "third"}
            image={BACKGROUND_PORTRAITS}
            route="/portraits"
            handleClick={scaleDown}
            position={mousePosition}
            style={{
              marginTop: sectionMarginTop,
              width: sectionHeight,
              height: sectionHeight
            }}
          />

          <SectionButton
            className="second"
            image={BACKGROUND_LANDSCAPES}
            route="/landscapes"
            handleClick={scaleDown}
            position={mousePosition}
            style={{
              marginTop: sectionMarginTop,
              width: sectionHeight,
              height: sectionHeight
            }}
          />
          <SectionButton
            className={!isShrink ? "third" : "first"}
            image={BACKGROUND_STILL_LIFE}
            route="/still-life"
            handleClick={scaleDown}
            position={mousePosition}
            style={{
              marginTop: sectionMarginTop,
              width: sectionHeight,
              height: sectionHeight
            }}
          />
        </div>
      </div>
    </Header>
  )
}

const AppHeader = styled(_AppHeader)`
   {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #e6e6e6;

    .shadow {
      -webkit-box-shadow: 10px 10px 42px -17px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 42px -17px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 42px -17px rgba(0, 0, 0, 0.75);
    }

    .logo {
      position: absolute;

      .logo-link {
      }

      .logo-img {
        width: 100%;
      }
    }

    .logo-immediate {
      transition: margin-top 1000ms ease-out, margin-left 1000ms ease-out,
        height 1000ms ease-out, width 1000ms ease-out;
    }

    .logo-wait {
      transition: margin-top 1000ms ease-out 150ms,
        margin-left 1000ms ease-out 150ms, height ease-out 1000ms 150ms,
        width 1000ms ease-out 150ms;
    }

    .sign-container {
      position: absolute;
      text-align: center;
    }

    .sign-wait {
      transition: opacity 500ms ease-out 1000ms;
    }

    .sign-immediate {
      transition: opacity 300ms ease-out;
    }

    .sign {
      ${"" /* width: ${LOGO_HEIGHT * LOGO_RATIO}px; */}
    }

    .sections {
      text-align: center;

      .first {
        transition: margin-top 1000ms ease-out, width 1000ms ease-out,
          height 1000ms ease-out;
      }

      .second {
        transition: margin-top 1000ms ease-out 100ms,
          width 1000ms ease-out 100ms, height 1000ms ease-out 100ms;
      }

      .third {
        transition: margin-top 1000ms ease-out 200ms,
          width 1000ms ease-out 200ms, height 1000ms ease-out 200ms;
      }
    }
  }
`

export default AppHeader
