import React, { useEffect } from "react"
import Page from "./Page"
import { Link } from "react-router-dom"

function LoginPage() {
  return (
    <Page title="Login" formMode={true} backgroundClass="login-background">
      <form className="regForm">
        <h5>Welcome back! 👋</h5>
        <h2>Login to your account</h2>
        <div className="form-ele">
          <label htmlFor="Email">Email</label>
          <div>
            <input type="email" placeholder="Enter your email here" id="Email" />
          </div>
          <label htmlFor="password">Password</label>

          <div>
            <input type="password" placeholder="enter your password here" id="password" />
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
