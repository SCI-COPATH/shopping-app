import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import Header from "./Header"

function ViewSingleItom() {
  const appState = useContext(StateContext)
  console.log(appState.items)
  console.log(appState.items.filter((x) => x.id == appState.selectedItem))
  return (
    <>
      <Header />
    </>
  )
}

export default ViewSingleItom
