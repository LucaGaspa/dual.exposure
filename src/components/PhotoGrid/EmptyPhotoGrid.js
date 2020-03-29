import React from "react"

const WIP_IMAGE = require("../../res/WIP.svg")

function EmptyPhotoGrid(props) {
  return (
    <div className={props.className}>
      <img className="image" src={WIP_IMAGE} alt="WIP" />
    </div>
  )
}

export default EmptyPhotoGrid
