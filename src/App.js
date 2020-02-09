import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Layout } from "antd"
import styled from "styled-components"

import "./App.css"
import AppHeader from "./components/AppHeader"

const { Header, Content } = Layout

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

function Home() {
  return (
    <div style={{ height: "1000px" }}>
      <h2>Home</h2>
    </div>
  )
}

function Portraits() {
  return <h2 style={{ height: "1000px" }}>Portraits</h2>
}

function Landscapes() {
  return <h2 style={{ height: "1000px" }}>Landscapes</h2>
}

function Studio() {
  return <h2 style={{ height: "1000px" }}>Studio</h2>
}

const App = styled(_App)`
   {
    min-width: 375px;

    .content {
      height: 100%;
    }

    .max-margin {
      margin-top: 400px;
      transition: margin-top 1000ms ease-out;
    }

    .min-margin {
      margin-top: 150px;
      transition: margin-top 1000ms ease-out 200ms;
    }
  }
`
export default App
