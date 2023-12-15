import React, { useContext, useEffect } from "react"
import StateContext from "../StateContext"
import DispachContext from "../DispachContext"
import Header from "./Header"
import AdminHome from "./AdminHome"
import UserHome from "./UserHome"

function Home() {
  const appState = useContext(StateContext)

  return (
    <>
      <Header />
      {appState.user.userType == "user" ? <UserHome /> : <AdminHome />}
    </>
  )
}

export default Home
