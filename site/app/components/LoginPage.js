import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"
import DispachContext from "../DispachContext"

function LoginPage(props) {
  const [userId, setUserId] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const appDispach = useContext(DispachContext)
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log(userId)
      console.log(password)
      const response = await Axios.post("/login", { userId, password })
      console.log(response.data)
      const itemList = await Axios.get("/product-list")
      console.log(itemList.data.data)
      let accounts
      if (response.data.user.userType == "admin") accounts = (await Axios.get("/get-user-accounts")).data.data
      else accounts = ""
      console.log(accounts)
      appDispach({ type: "login", data: response.data.user, items: itemList.data.data, accounts: accounts })
      // set-accounts

      console.log("Seucessfuly set")
      navigate("/")
    } catch (error) {
      console.log("somthing worong")
    }
  }
  return (
    <Page title="Login" formMode={true} backgroundURL="url(./assets/loginBackground.svg)">
      <form className="regForm" onSubmit={handleSubmit}>
        <h5>Welcome back! 👋</h5>
        <h2>Login to your account</h2>
        <div className="form-ele">
          <label htmlFor="Email">Email</label>
          <div>
            <input onChange={(e) => setUserId(e.target.value)} type="email" placeholder="Enter your email here" id="Email" />
          </div>
          <label htmlFor="password">Password</label>

          <div>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password here" id="password" />
          </div>
          <div className="spacer"></div>
          <input type="submit" value="login" className="subBut" />
          <div>
            <small>
              <Link to="#">Forget Password?</Link>
            </small>
          </div>
          <div>
            <small>
              Not registered?<Link to="/sign-up"> Create an account</Link>
            </small>
          </div>
        </div>
      </form>
    </Page>
  )
}

export default LoginPage
