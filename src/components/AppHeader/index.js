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

const LOGO_HEIGHT = 250
const LOGO_RATIO = 1.36

const SIGN_RATIO = 0.123

const MIN_LOGO_HEIGHT = 50
const MIN_LOGO_MARGIN_LEFT = 30

const SECTION_MARGIN_TOP = 0
const MAX_SECTIONS_WIDTH = 600

const SMALL_SCREEN = 480
// const MEDIUM_SCREEN = 675

function _AppHeader(props) {
  const [isShrink, setIsShrink] = useState(false)

  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const initialLogoHeight =
    innerWidth > SMALL_SCREEN ? LOGO_HEIGHT : LOGO_HEIGHT - 30
  const [logoHeight, setLogoHeight] = useState(initialLogoHeight)

  const logoInitialMargin = (innerWidth - initialLogoHeight * LOGO_RATIO) / 2
  const [logoMargin, setLogoMargin] = useState(logoInitialMargin)

  const [signMarginTop, setSignMarginTop] = useState(
    LOGO_HEIGHT + LOGO_MARGIN_TOP
  )

  const [sectionMarginTop, setSectionMarginTop] = useState(
    LOGO_HEIGHT +
      LOGO_MARGIN_TOP +
      LOGO_HEIGHT * LOGO_RATIO * SIGN_RATIO +
      SECTION_MARGIN_TOP
  )

  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)

    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  useLayoutEffect(() => {
    function updateSize() {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }
    window.addEventListener("resize", updateSize)
  }, [])

  function scaleDown() {
    props.changeState(true)

    setLogoMargin(MIN_LOGO_MARGIN_LEFT)
    setLogoHeight(MIN_LOGO_HEIGHT)
    setSignMarginTop(0)
    setSectionMarginTop(10)

    setIsShrink(true)
  }

  function scaleUp() {
    props.changeState(false)
    setLogoMargin((innerWidth - LOGO_HEIGHT * LOGO_RATIO) / 2)
    setLogoHeight(LOGO_HEIGHT)
    setSignMarginTop(LOGO_HEIGHT + LOGO_MARGIN_TOP)
    setSectionMarginTop(
      LOGO_HEIGHT +
        LOGO_MARGIN_TOP +
        LOGO_HEIGHT * LOGO_RATIO * SIGN_RATIO +
        SECTION_MARGIN_TOP
    )

    setIsShrink(false)
  }

  return (
    <Header className={props.className}>
      <div
        // styles happens immediatly, while className comes in after when isShrink is changed
        // changing transition effect for the next click
        className={"logo " + (!isShrink ? "logo-wait" : "logo-immediate")}
        style={{
          marginLeft: logoMargin,
          height: logoHeight,
          width: logoHeight * LOGO_RATIO
        }}
      >
        <Link to="/" className="logo-link" onClick={scaleUp}>
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div
        className="sign-container"
        style={{
          opacity: isShrink ? 0 : 1,
          marginLeft: logoInitialMargin,
          marginTop: signMarginTop
        }}
      >
        <img className="sign" src={sign} />
      </div>

      <div className="sections">
        <SectionButton
          className={!isShrink ? "first" : "third"}
          image={BACKGROUND_PORTRAITS}
          route="/portraits"
          handleClick={scaleDown}
          style={{
            marginTop: sectionMarginTop,
            width: (isShrink ? "12" : "20") + "vw",
            height: (isShrink ? "12" : "20") + "vw"
          }}
        />

        <SectionButton
          className="second"
          image={BACKGROUND_LANDSCAPES}
          route="/landscapes"
          handleClick={scaleDown}
          style={{
            marginTop: sectionMarginTop,
            width: (isShrink ? "12" : "20") + "vw",
            height: (isShrink ? "12" : "20") + "vw"
          }}
        />
        <SectionButton
          className={!isShrink ? "third" : "first"}
          image={BACKGROUND_STILL_LIFE}
          route="/still-life"
          handleClick={scaleDown}
          style={{
            marginTop: sectionMarginTop,
            width: (isShrink ? "12" : "20") + "vw",
            height: (isShrink ? "12" : "20") + "vw"
          }}
        />
      </div>
    </Header>
  )
}

const AppHeader = styled(_AppHeader)`
   {
    position: fixed;
    top: 0;
    width: 100%;
    zindex: 1;

    .logo {
      position: absolute;
      z-index: 100;

      margin-top: ${LOGO_MARGIN_TOP}px;

      .logo-link {
      }

      .logo-img {
        max-width: 100%;
      }
    }

    .logo-immediate {
      transition: margin-left 1000ms ease-out, height 1000ms ease-out,
        width 1000ms ease-out;
    }

    .logo-wait {
      transition: margin-left 1000ms ease-out 150ms,
        height ease-out 1000ms 150ms, width 1000ms ease-out 150ms;
    }

    .sign-container {
      position: absolute;
      text-align: center;

      transition: margin-top 1000ms ease-out, opacity 500ms;
    }

    .sign {
      width: ${LOGO_HEIGHT * LOGO_RATIO}px;
    }

    .sections {
      z-index: 1000;
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
