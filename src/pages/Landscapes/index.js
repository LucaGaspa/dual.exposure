import React from "react"

import PhotoGrid from "../../components/PhotoGrid"
import LANDSCAPE_PATHS from "../../constants/landscapes"

function Landscapes(props) {
  return (
    <div className={props.className}>
      <PhotoGrid photos={LANDSCAPE_PATHS} />
    </div>
  )
}

export default Landscapes
