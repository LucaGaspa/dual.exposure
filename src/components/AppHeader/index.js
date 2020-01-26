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

const SECTION_MARGIN_TOP = 280
const MIN_SECTION_MARGIN_TOP = 30

const SMALL_SCREEN = 480
const MEDIUM_SCREEN = 675

function _AppHeader(props) {
  const [isShrink, setIsShrink] = useState(false)

  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const [logoHeight, setLogoHeight] = useState(
    innerWidth > SMALL_SCREEN ? LOGO_HEIGHT : LOGO_HEIGHT - 30
  )

  const [logoMargin, setLogoMargin] = useState(
    (innerWidth - logoHeight * LOGO_RATIO) / 2
  )

  const [sectionMarginTop, setSectionMarginTop] = useState(SECTION_MARGIN_TOP)

  // const [sectionLinkHeight, setsectionLinkHeight] = useState(
  //   innerWidth > SMALL_SCREEN ? SECTION_HEIGHT : MIN_SECTION_HEIGHT
  // )

  useLayoutEffect(() => {
    function updateSize() {
      setInnerWidth(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
  }, [])

  // useDocumentScrollThrottled(callbackData => {
  //   const { previousScrollTop, currentScrollTop } = callbackData
  //   const isScrolledDown = previousScrollTop < currentScrollTop
  // })

  function handleClick() {
    props.changeState(true)

    setLogoMargin(MIN_LOGO_MARGIN_LEFT)
    setLogoHeight(MIN_LOGO_HEIGHT)
    setSectionMarginTop(MIN_SECTION_MARGIN_TOP)

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
            props.changeState(false)
            setLogoMargin((innerWidth - LOGO_HEIGHT * LOGO_RATIO) / 2)
            setLogoHeight(LOGO_HEIGHT)
            setSectionMarginTop(SECTION_MARGIN_TOP)

            setTimeout(() => {
              setIsShrink(false)
            }, 1000)
          }}
        >
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>

      <div className="sections">
        <Link
          to="/studio"
          className={"sections-link " + (isShrink ? "first" : "third")}
          style={{
            // height: sectionLinkHeight,
            // width: sectionLinkHeight,
            marginTop: sectionMarginTop,
            backgroundColor: "cyan"
          }}
          onClick={handleClick}
        >
          Studio
        </Link>

        <Link
          to="/landscapes"
          className="sections-link second"
          style={{
            // height: sectionLinkHeight,
            // width: sectionLinkHeight,
            marginTop: sectionMarginTop,
            backgroundColor: "green"
          }}
          onClick={handleClick}
        >
          Landscapes
        </Link>

        <Link
          to="/portraits"
          className={"sections-link " + (isShrink ? "third" : "first")}
          style={{
            // height: sectionLinkHeight,
            // width: sectionLinkHeight,
            marginTop: sectionMarginTop,
            backgroundColor: "red"
          }}
          onClick={handleClick}
        >
          Portraits
        </Link>
      </div>
    </Header>
  )
}

const AppHeader = styled(_AppHeader)`
   {
    position: fixed;
    width: 100%;
    zindex: 1;

    .logo {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 0;

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

      .sections-link {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 130px;
        height: 130px;
        border-radius: 50%;

        margin: 0 30px;
      }

      .first {
        transition: margin-top 1000ms ease-out;
      }

      .second {
        transition: margin-top 1000ms ease-out 100ms;
      }

      .third {
        transition: margin-top 1000ms ease-out 200ms;
      }
    }
  }
`

export default AppHeader
