import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import DispachContext from "../DispachContext"

function Home() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  function handileLogout() {
    appDispach({ type: "logout" })
  }
  return (
    <>
      <h1>Welcome {appState.user.userName}</h1>
      <button onClick={handileLogout}>logout</button>
    </>
  )
}

export default Home
