import React, { useEffect, useState } from "react"
import Page from "./Page"
import { Link } from "react-router-dom"
import Axios from "axios"

function SignupPage() {
  const [userId, setUserId] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  async function handilSublit(e) {
    e.preventDefault()
    console.log(userId)
    console.log(password)
    console.log(name)
    try {
      await Axios.post("http://localhost:8081/register", { name, userId, password })
      console.log("User was successfully created.")
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Page title="Sign up" formMode={true} backgroundClass="signup-background">
      <form className="signupForm" onSubmit={handilSublit}>
        <h5>hello ! 👋</h5>
        <h2>Create an account</h2>
        <div className="form-ele">
          <label htmlFor="name">Name</label>
          <div>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" id="name" />
          </div>
          <label htmlFor="Email">Email</label>
          <div>
            <input type="email" onChange={(e) => setUserId(e.target.value)} placeholder="enter your email here" id="Email" />
          </div>
          <label htmlFor="password">Password</label>

          <div>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="enter new password" id="password" />
          </div>
          <label htmlFor="cpassword">Confirm Password</label>

          <div>
            <input type="text" placeholder="confirm  new password" id="cpassword" />
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
