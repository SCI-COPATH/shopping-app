import React, { useContext, useEffect } from "react"
import { createRoot } from "react-dom/client"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import LoginPage from "./components/LoginPage"
import SignupPage from "./components/SignupPage"
import StateContext from "./StateContext"
import DispachContext from "./DispachContext"
import Home from "./components/Home"
import WelcomeGuest from "./components/welcomeGuset"
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8081"

import Profile from "./components/Profile"
import YourOrder from "./components/YourOrder"
import Cart from "./components/Cart"
import Stocks from "./components/Stocks"
import AddItem from "./components/AddItem"

function Main() {
  const initialStage = {
    loggedIn: Boolean(localStorage.getItem("token")),
    user: {
      userName: localStorage.getItem("userName"),
      token: localStorage.getItem("token"),
      avatar: localStorage.getItem("avatar"),
      userType: localStorage.getItem("userType"),
    },
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialStage)
  useEffect(() => {
    console.log("Inisde use effect")
    if (state.loggedIn) {
      console.log("Login is true")
      localStorage.setItem("userName", state.user.userName)
      localStorage.setItem("token", state.user.token)
      localStorage.setItem("avatar", state.user.avatar)
      localStorage.setItem("userType", state.user.userType)
      console.log("prob")
    } else {
      localStorage.removeItem("userName")
      localStorage.removeItem("token")
      localStorage.removeItem("avatar")
      localStorage.removeItem("userType")
    }
  }, [state.loggedIn])
  useEffect(() => {
    console.log("run in start")
    async function updateToken() {
      try {
        const res = await Axios.post("/checkAuth", { userId: state.user.userName, tokrn: state.user.token, userType: state.user.userType })
        console.log(res.data.user)
        state.user = res.data.user
        if (res.data.message != "token Expried") {
          localStorage.setItem("token", res.data.user.token)
        } else {
          localStorage.removeItem("userName")
          localStorage.removeItem("token")
          localStorage.removeItem("avatar")
          localStorage.removeItem("userType")
        }
      } catch (error) {
        localStorage.removeItem("userName")
        localStorage.removeItem("token")
        localStorage.removeItem("avatar")
        localStorage.removeItem("userType")
        state.user.token = ""
        state.user.userName = ""
        state.user.userType = ""
        state.user.avatar = ""
        state.loggedIn = "false"
      }
    }
    if (Boolean(state.user.token)) {
      // try {
      updateToken()
      // } catch (error) {
      //   console.log("ERROR")
      // }
    }
  }, [])
  return (
    <StateContext.Provider value={state}>
      <DispachContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={state.loggedIn ? <Home /> : <WelcomeGuest />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<YourOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/stock" element={<Stocks />} />
            <Route path="/admin/add-item" element={<AddItem />} />
          </Routes>
        </BrowserRouter>
      </DispachContext.Provider>
    </StateContext.Provider>
  )
}

const root = createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
