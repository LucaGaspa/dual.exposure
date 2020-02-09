import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Layout } from "antd"
import styled from "styled-components"

import "./App.css"
import PHOTOS from "./constants/"
import AppHeader from "./components/AppHeader"
import PhotoGrid from "./components/PhotoGrid"

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
    <div className="home-container">
      <h2>Dual Exposure Studio</h2>
      <div>Contact Us</div>
    </div>
  )
}

function Portraits() {
  console.log(PHOTOS)
  return (
    <div>
      <PhotoGrid photos={PHOTOS} />
    </div>
  )
}

function Landscapes() {
  return (
    <div>
      <PhotoGrid photos={PHOTOS} />
    </div>
  )
}

function Studio() {
  return (
    <div>
      <PhotoGrid photos={PHOTOS} />
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
      margin-top: 420px;
      transition: margin-top 1000ms ease-out;
    }

    .min-margin {
      margin-top: 170px;
      transition: margin-top 1000ms ease-out 200ms;
    }

    .home-container {
      text-align: center;

      h2 {
        font-weight: 400;
        font-size: 32pt;
      }
    }
  }
`
export default App
