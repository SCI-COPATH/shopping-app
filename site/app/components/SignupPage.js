import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"
import DispachContext from "../DispachContext"

function SignupPage() {
  const [userId, setUserId] = useState()
  const [password, setPassword] = useState()
  const [userName, setUserName] = useState()
  const appContext = useContext(DispachContext)
  const naviagte = useNavigate()
  async function handilSublit(e) {
    e.preventDefault()
    // console.log(userId)
    // console.log(password)
    // console.log(name)
    try {
      const response = await Axios.post("/register", { userName, userType: "user", userId, password })
      console.log("User was successfully created.")
      console.log(response.data.user)
      const itemList = await Axios.get("/product-list")
      console.log(itemList.data.data)
      appContext({ type: "login", data: response.data.user, items: itemList.data.data })
      naviagte("/")
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Page title="Sign up" formMode={true} backgroundURL="url(./assets/signupBackgorund.svg)">
      <form className="signupForm" onSubmit={handilSublit}>
        <h5>hello ! 👋</h5>
        <h2>Create an account</h2>
        <div className="form-ele">
          <label htmlFor="name">Name</label>
          <div>
            <input type="text" onChange={(e) => setUserName(e.target.value)} placeholder="Enter your full name" id="name" />
          </div>
          <label htmlFor="Email">Email</label>
          <div>
            <input type="email" onChange={(e) => setUserId(e.target.value)} placeholder="Enter your email here" id="Email" />
          </div>
          <label htmlFor="password">Password</label>

          <div>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" id="password" />
          </div>
          <label htmlFor="cpassword">Confirm Password</label>

          <div>
            <input type="text" placeholder="Confirm  new password" id="cpassword" />
          </div>
          <div className="spacer"></div>
          <input type="submit" value="Sign Up" className="subBut" />
          <div className="spacer"></div>
          <div>
            <small>
              Already registered? <Link to="/log-in"> Login</Link>
            </small>
          </div>
        </div>
      </form>
    </Page>
  )
}

export default SignupPage
