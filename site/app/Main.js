import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"

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
          </Routes>
        </BrowserRouter>
      </DispachContext.Provider>
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
