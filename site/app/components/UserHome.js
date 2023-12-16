import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"

function UserHome() {
  const appState = useContext(StateContext)
  console.log(appState.items)
  return (
    <>
      <Page title="home">
        <h1>User Home</h1>
        <p>{appState.items.length}</p>
      </Page>
    </>
  )
}

export default UserHome
