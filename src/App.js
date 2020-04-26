import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom"
import { Layout } from "antd"
import styled from "styled-components"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import "./App.css"
import AppHeader from "./components/AppHeader"
import Home from "./pages/Home"
import StillLife from "./pages/StillLife"
import Landscapes from "./pages/Landscapes"
import Portraits from "./pages/Portraits"
import Constants from "./constants/"

const { Content } = Layout

const CONTENT_ADDITIONAL_MARGIN = 60

function _App(props) {
  const navLocation = useLocation()
  const [isShrink, setIsShrink] = useState(
    navLocation.pathname !== "/" ||
      window.innerWidth <= Constants.MOBILE_THRESHOLD
  )
  const [size, setSize] = useState(undefined)

  function changeState(isShrinking, size) {
    setIsShrink(isShrinking)
    setSize(size)
  }

  let contentMarginTop = 100
  if (!isShrink) {
    contentMarginTop = (window.innerHeight * 2) / 3 + CONTENT_ADDITIONAL_MARGIN
  }
  if (window.innerWidth <= Constants.MOBILE_THRESHOLD) {
    contentMarginTop = 70
  }

  return (
    <div className={props.className}>
      <Layout>
        <Content
          className={"content " + (isShrink ? "min-margin" : "max-margin")}
          style={{
            marginTop: contentMarginTop,
          }}
        >
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/portraits">
                      <div className="page">
                        <Portraits />
                      </div>
                    </Route>
                    <Route path="/landscapes">
                      <div className="page">
                        <Landscapes />
                      </div>
                    </Route>
                    <Route path="/still-life">
                      <div className="page">
                        <StillLife />
                      </div>
                    </Route>
                    <Route path="/">
                      <div className="page">
                        <Home />
                      </div>
                    </Route>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </Content>
      </Layout>
      <AppHeader isShrink={isShrink} changeState={changeState} />
    </div>
  )
}

const App = styled(_App)`
   {
    min-width: 375px;

    .content {
      position: relative;
      height: 100%;
    }

    .max-margin {
      transition: margin-top 1000ms ease-out;
    }

    .min-margin {
      transition: margin-top 1000ms ease-out 300ms;
    }

    .page {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    /* simple - enter transition 300ms, exit 150ms */
    .fade-appear,
    .fade-enter {
      opacity: 0;
      z-index: 1;
    }
    .fade-appear-active,
    .fade-enter.fade-enter-active {
      opacity: 1;
      transition: opacity 300ms linear 150ms;
    }

    .fade-exit {
      opacity: 1;
    }

    .fade-exit.fade-exit-active {
      opacity: 0;
      transition: opacity 150ms linear;
    }
  }
`

// wrapping App component to permit useLocation call
function AppRouter() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <App />
    </Router>
  )
}

export default AppRouter
