import React from "react"

import PhotoGrid from "../../components/PhotoGrid"
import PHOTOS from "../../constants/"

function Studio(props) {
  return (
    <div className={props.className}>
      <PhotoGrid photos={PHOTOS} />
    </div>
  )
}

export default Studio
