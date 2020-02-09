import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from "antd"
import styled from "styled-components"

import "./App.css"
import AppHeader from "./components/AppHeader"
import Home from "./pages/Home"
import Studio from "./pages/Studio"
import Landscapes from "./pages/Landscapes"
import Portraits from "./pages/Portraits"

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
            <Switch>
              <Route path="/portraits">
                <Portraits />
              </Route>
              <Route path="/landscapes">
                <Landscapes />
              </Route>
              <Route path="/studio">
                <Studio />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
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
      height: 100%;
    }

    .max-margin {
      margin-top: 460px;
      transition: margin-top 1000ms ease-out;
    }

    .min-margin {
      margin-top: 170px;
      transition: margin-top 1000ms ease-out 200ms;
    }
  }
`
export default App
