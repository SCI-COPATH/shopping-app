import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import { Link } from "react-router-dom"
function AdminHome() {
  const appState = useContext(StateContext)

  return (
    <>
      <Page title="Admin Home" wide={true}>
        <h3>Hello {appState.user.userName} 👋</h3>
        <div className="d-flex justify-content-between">
          <div className="p-2 m-2 w-50">
            <h5>Update Product Status </h5>
            <div>
              <Link className="icon-link icon-link-hover fw-semibold" to="/admin/add-item">
                <i className="fa-solid fa-plus" aria-hidden="true"></i>
                Add New item
              </Link>
            </div>

            <div>
              <Link className="icon-link icon-link-hover fw-semibold" to="/admin/update-stock">
                <i className="fa-solid fa-pencil" aria-hidden="true"></i>
                Update stocks
              </Link>
            </div>
            <div>
              <Link className="icon-link icon-link-hover fw-semibold" to="/admin/add-admin">
                <i className="fa-solid fa-user-plus" aria-hidden="true"></i>
                Add Admin
              </Link>
            </div>
            <div>
              <Link className="icon-link icon-link-hover fw-semibold" to="admin/remove-admin">
                <i className="fa-solid fa-user-minus" aria-hidden="true"></i>
                Remove Admin
              </Link>
            </div>
          </div>
          <div className="p-2 m-2 w-100">
            <h5>Customer status</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus porro fugit adipisci corrupti accusantium ut in iste saepe optio dolorem dolore laborum, minus sed quae animi doloremque ducimus! Eligendi, quam!</p>
          </div>
        </div>
      </Page>
    </>
  )
}

export default AdminHome
