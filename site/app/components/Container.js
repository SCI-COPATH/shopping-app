import React, { useEffect } from "react"

function Container(props) {
  function OuterInner() {
    return (
      <div className={props.formMode ? ("form-outer outer " + Boolean(props.backgroundURL) ? "background-class" : "") : "outer " + Boolean(props.backgroundURL) ? "background-class" : ""} style={{ backgroundImage: props.backgroundURL }}>
        <div className={props.formMode ? "form-inner inner" : "inner"}>{props.children}</div>
      </div>
    )
  }
  function SinglePage() {
    return <div className={"container py-md-5 " + (props.wide ? "" : "container--narrow")}>{props.children}</div>
  }
  return props.formMode ? <OuterInner /> : <SinglePage />
}

export default Container
