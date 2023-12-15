import React, { useEffect } from "react"

function Container(props) {
  function SinglePage() {
    return <div className={"container py-md-5  top-padding" + (props.wide ? "" : " top-padding container--narrow")}>{props.children}</div>
  }
  function formBlock() {
    return (
      <div className={Boolean(props.backgroundURL) ? "form-outer outer background-class" : "form-outer outer top-padding"} style={{ backgroundImage: props.backgroundURL }}>
        <div className={"form-inner inner"}>{props.children}</div>
      </div>
    )
  }
  return props.formMode ? formBlock() : SinglePage()
}

export default Container
