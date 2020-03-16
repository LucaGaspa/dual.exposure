import React from "react"

import PhotoGrid from "../../components/PhotoGrid"
import EmptyPhotoGrid from "../../components/PhotoGrid/EmptyPhotoGrid"
import STILL_LIFE_PATHS from "../../constants/stillLife"

function StillLife(props) {
  return (
    <div className={props.className}>
      {STILL_LIFE_PATHS.length > 0 && <PhotoGrid photos={STILL_LIFE_PATHS} />}
      {STILL_LIFE_PATHS.length <= 0 && <EmptyPhotoGrid />}
    </div>
  )
}

export default StillLife
