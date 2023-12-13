import React, { useEffect } from "react"

function Container(props) {
  return (
    <div className={props.formMode ? "form-outer outer " + props.backgroundClass : "outer " + props.backgroundClass}>
      {/* <div className={"container py-md-5 " + (props.wide ? "" : "container--narrow")}>{props.children}</div> */}
      <div className={props.formMode ? "form-inner inner" : "inner"}>{props.children}</div>
    </div>
  )
}

export default Container
