import React, { useState, useLayoutEffect } from "react"
import { Link } from "react-router-dom"
import { Layout, Typography } from "antd"
import styled from "styled-components"

import logo from "../../res/DE_Logo.png"

const { Header } = Layout

const LOGO_HEIGHT = 180
const LOGO_RATIO = 1.36
const MIN_LOGO_HEIGHT = 50
const MIN_LOGO_MARGIN_LEFT = 30

const MAX_SECTION_CONTAINER_WIDTH = 600
const MIN_SECTION_CONTAINER_WIDTH = 400

const MAX_SECTION_BOX_HEIGHT = 400
const MIN_SECTION_BOX_HEIGHT = 150

const SMALL_SCREEN = 480
const MEDIUM_SCREEN = 675

const BACKGROUND_IMAGE = require("../../res/background.jpg")
const BACKGROUND_LANDSCAPES = require("../../res/landscapes.svg")

function _AppHeader(props) {
  const [isShrink, setIsShrink] = useState(false)

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const [logoHeight, setLogoHeight] = useState(
    innerWidth > SMALL_SCREEN ? LOGO_HEIGHT : LOGO_HEIGHT - 30
  )

  const [logoMargin, setLogoMargin] = useState(
    (innerWidth - logoHeight * LOGO_RATIO) / 2
  )

  const [sectionContainerWidth, setSectionContainerWidth] = useState(600)
  const [sectionBoxHeight, setSectionBoxHeight] = useState(
    MAX_SECTION_BOX_HEIGHT
  )

  useLayoutEffect(() => {
    function updateSize() {
      setInnerWidth(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
  }, [])

  function handleClick() {
    props.changeState(true)

    setLogoMargin(MIN_LOGO_MARGIN_LEFT)
    setLogoHeight(MIN_LOGO_HEIGHT)
    setSectionBoxHeight(MIN_SECTION_BOX_HEIGHT)
    setSectionContainerWidth(MIN_SECTION_CONTAINER_WIDTH)

    setTimeout(() => {
      setIsShrink(true)
    }, 1000)
  }

  return (
    <Header className={props.className}>
      <div
        className={"logo " + (isShrink ? "logo-wait" : "logo-immediate")}
        style={{
          marginLeft: logoMargin,
          height: logoHeight,
          width: logoHeight * LOGO_RATIO
        }}
      >
        <Link
          to="/"
          className="logo-link"
          onClick={() => {
            // LOGO CLICK
            props.changeState(false)
            setLogoMargin((innerWidth - LOGO_HEIGHT * LOGO_RATIO) / 2)
            setLogoHeight(LOGO_HEIGHT)
            setSectionBoxHeight(MAX_SECTION_BOX_HEIGHT)
            setSectionContainerWidth(MAX_SECTION_CONTAINER_WIDTH)

            setTimeout(() => {
              setIsShrink(false)
            }, 1000)
          }}
        >
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="sections">
        <div
          className="sections-container"
          style={{ width: sectionContainerWidth }}
        >
          <div
            className={"section-box " + (isShrink ? "first" : "third")}
            style={{ height: sectionBoxHeight }}
          >
            <div className="section-box-background"></div>
            <div className="section-box-image"></div>
            <Link
              to="/studio"
              className={"sections-link"}
              onClick={handleClick}
            ></Link>
          </div>
          <div
            className="section-box second"
            style={{ height: sectionBoxHeight }}
          >
            <div className="section-box-background"></div>
            <div className="section-box-image"></div>
            <Link
              to="/landscapes"
              className="sections-link"
              onClick={handleClick}
            ></Link>
          </div>
          <div
            className={"section-box " + (isShrink ? "third" : "first")}
            style={{ height: sectionBoxHeight }}
          >
            <div className="section-box-background"></div>
            <div className="section-box-image"></div>
            <Link
              to="/portraits"
              className={"sections-link"}
              onClick={handleClick}
            ></Link>
          </div>
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
    background-color: #fff;
    zindex: 1;

    .logo {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;

      margin: 50px 0;

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

    .sections {
      display: flex;
      justify-content: center;
      width: 100%;

      z-index: 100;

      .sections-container {
        display: flex;
        flex-direction: row;

        transition: width 1000ms ease-out;
      }

      .section-box {
        width: 33.5%;

        position: relative;

        display: flex;
        justify-content: center;

        .section-box-background {
          position: absolute;
          bottom: 0;

          height: 100%;
          width: 100%;

          background-image: url(${BACKGROUND_IMAGE});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }

        .section-box-image {
          position: absolute;
          bottom: 0;

          height: 110%;
          width: 110%;

          background-image: url(${BACKGROUND_LANDSCAPES});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center bottom -2px;
        }
      }

      .sections-link {
        position: absolute;
        bottom: 0px;

        display: flex;
        justify-content: center;
        align-items: center;

        height: 140px;
        width: 140px;
        border-radius: 50%;
      }

      .first {
        transition: height 1000ms ease-out;
      }

      .second {
        transition: height 1000ms ease-out 100ms;
      }

      .third {
        transition: height 1000ms ease-out 200ms;
      }
    }
  }
`

export default AppHeader
