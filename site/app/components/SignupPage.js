import React, { useEffect } from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function SignupPage() {
  return (
    <Page title="Sign up" formMode={true} backgroundClass="signup-background">
      <form className="signupForm">
        <h5>hello ! 👋</h5>
        <h2>Create an account</h2>
        <div className="form-ele">
          <label htmlFor="name">Name</label>
          <div>
            <input type="text" placeholder="Enter your full name" id="name" />
          </div>
          <label htmlFor="Email">Email</label>
          <div>
            <input type="email" placeholder="enter your email here" id="Email" />
          </div>
          <label htmlFor="password">Password</label>

          <div>
            <input type="password" placeholder="enter new password" id="password" />
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
