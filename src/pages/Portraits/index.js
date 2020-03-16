import React from "react"

import PhotoGrid from "../../components/PhotoGrid"
import EmptyPhotoGrid from "../../components/PhotoGrid/EmptyPhotoGrid"
import PORTRAIT_PATHS from "../../constants/portraits"

function Portraits(props) {
  return (
    <div className={props.className}>
      {PORTRAIT_PATHS.length > 0 && <PhotoGrid photos={PORTRAIT_PATHS} />}
      {PORTRAIT_PATHS.length <= 0 && <EmptyPhotoGrid />}
    </div>
  )
}

export default Portraits
