import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import DispachContext from "../DispachContext"
import Header from "./Header"

function Home() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  function handileLogout() {
    appDispach({ type: "logout" })
  }
  return (
    <>
      <Header />
      <h1>Welcome {appState.user.userName}</h1>
      <button onClick={handileLogout}>logout</button>
    </>
  )
}

export default Home
