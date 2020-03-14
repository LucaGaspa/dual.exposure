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

const SIGN_RATIO = 0.126

const MIN_LOGO_HEIGHT = 50
const MIN_LOGO_MARGIN_LEFT = 30
const MIN_LOGO_MARGIN_TOP = 25

const SECTION_MARGIN_TOP = 0

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
  const [logoMarginTop, setLogoMarginTop] = useState(LOGO_MARGIN_TOP)

  const [signMarginTop, setSignMarginTop] = useState(
    LOGO_HEIGHT + LOGO_MARGIN_TOP
  )

  const [sectionMarginTop, setSectionMarginTop] = useState(
    LOGO_HEIGHT +
      LOGO_MARGIN_TOP +
      LOGO_HEIGHT * LOGO_RATIO * SIGN_RATIO +
      SECTION_MARGIN_TOP
  )

  const [hasShadow, setHasShadow] = useState(false)

  const [mousePosition, setMousePosition] = useState({ x: null, y: null })

  const updateMousePosition = ev => {
    let newX = (ev.clientX / innerWidth) * (isShrink ? 24 : 40)
    let newY = (ev.clientY / innerHeight) * (isShrink ? 24 : 40)
    setMousePosition({ x: newX, y: newY })
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

    setLogoHeight(MIN_LOGO_HEIGHT)
    setLogoMargin(MIN_LOGO_MARGIN_LEFT)
    setLogoMarginTop(MIN_LOGO_MARGIN_TOP)
    // setSignMarginTop(0)
    setSectionMarginTop(0)

    setIsShrink(true)
    setTimeout(() => {
      setHasShadow(true)
    }, 1200)
  }

  function scaleUp() {
    props.changeState(false)
    setLogoMargin((innerWidth - LOGO_HEIGHT * LOGO_RATIO) / 2)
    setLogoHeight(LOGO_HEIGHT)
    setLogoMarginTop(LOGO_MARGIN_TOP)
    setSignMarginTop(LOGO_HEIGHT + LOGO_MARGIN_TOP)
    setSectionMarginTop(
      LOGO_HEIGHT +
        LOGO_MARGIN_TOP +
        LOGO_HEIGHT * LOGO_RATIO * SIGN_RATIO +
        SECTION_MARGIN_TOP
    )

    setIsShrink(false)
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
          className={
            "sign-container " + (isShrink ? "sign-immediate" : "sign-wait")
          }
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
            position={mousePosition}
            style={{
              marginTop: sectionMarginTop,
              width: isShrink ? "100px" : "20vw",
              height: isShrink ? "100px" : "20vw"
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
              width: isShrink ? "100px" : "20vw",
              height: isShrink ? "100px" : "20vw"
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
              width: isShrink ? "100px" : "20vw",
              height: isShrink ? "100px" : "20vw"
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
        max-width: 100%;
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
      width: ${LOGO_HEIGHT * LOGO_RATIO}px;
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
