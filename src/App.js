import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from "antd"
import styled from "styled-components"

import "./App.css"
import AppHeader from "./components/AppHeader"
import Home from "./pages/Home"
import StillLife from "./pages/StillLife"
import Landscapes from "./pages/Landscapes"
import Portraits from "./pages/Portraits"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const { Content } = Layout

function _App(props) {
  const [isShrink, setIsShrink] = useState(false)

  function changeState(isShrinking) {
    if (isShrinking) {
      setIsShrink(true)
    } else {
      setIsShrink(false)
    }
  }

  return (
    <div className={props.className}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Layout>
          <AppHeader changeState={changeState} />
          <Content
            className={"content " + (isShrink ? "min-margin" : "max-margin")}
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
      </Router>
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
      margin-top: 550px;
      transition: margin-top 1000ms ease-out;
    }

    .min-margin {
      margin-top: 170px;
      transition: margin-top 1000ms ease-out 200ms;
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
export default App
