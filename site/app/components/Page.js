import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | Shopping App`
    window.scrollTo(0, 0)
  }, [])

  return (
    <Container formMode={props.formMode} wide={props.wide} backgroundClass={props.backgroundClass}>
      {props.children}
    </Container>
  )
}

export default Page
