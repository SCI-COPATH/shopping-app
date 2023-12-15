import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import StateContext from "../StateContext"
import DispachContext from "../DispachContext"

function Header() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  function handleLogout() {
    appDispach({ type: "logout" })
  }
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex  justify-content-around flex-column flex-sm-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            Shopping App
          </Link>
        </h4>

        <div className=" d-flex flex-row my-3 my-md-0 ">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="fa-solid fa-search text-white my-auto icon-but" type="submit"></button>
            <Link to="/cart" className="text-white mx-1  my-auto header-search-icon">
              <i className="fa-solid fa-cart-shopping my-auto"></i>
            </Link>
          </form>

          <span className="dropdown mx-1  my-auto">
            <img className=" small-header-avatar dropdown-toggle" src={appState.user.avatar} type="button" data-bs-toggle="dropdown" aria-expanded="false" />

            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/orders">
                  Your order
                </Link>
              </li>
              <li>
                <span className="dropdown-item" onClick={handleLogout}>
                  logout
                </span>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
