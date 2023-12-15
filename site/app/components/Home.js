import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import DispachContext from "../DispachContext"
import Header from "./Header"
import AdminHome from "./AdminHome"

function Home() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  function handileLogout() {
    appDispach({ type: "logout" })
  }
  return (
    <>
      <Header />
      <AdminHome />
    </>
  )
}

export default Home
