import React, { useContext, useEffect, useState } from "react"
import Header from "./Header"
import Page from "./Page"
import StateContext from "../StateContext"
import Axios from "axios"
import DispachContext from "../DispachContext"

function AddAdmin() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  // console.log(appState.accounts)
  async function handilAddAdmin(id) {
    console.log(id)
    try {
      const responce = await Axios.post("/update-admin-type", { token: appState.user.token, id: id })
      console.log(responce.data)
      const accounts = await Axios.get("/get-user-accounts")
      appDispach({ type: "set-accounts", accounts: accounts.data.data })
      console.log(accounts.data.data)
    } catch (error) {}
  }
  return (
    <>
      <Header />
      <Page title="Update Admin" wide={true}>
        <ul className="list-group list-group-flush">
          {appState.accounts
            .filter((x) => x.userType == "user")
            .map((x) => {
              return (
                <>
                  <li className="list-group-item">
                    <div>{x.userName}</div>
                    <button
                      type="button"
                      id={x.userId}
                      className="btn btn-secondary btn-sm w-25"
                      onClick={(e) => {
                        handilAddAdmin(e.target.id)
                      }}
                    >
                      Add Admin
                    </button>
                  </li>
                </>
              )
            })}
        </ul>
      </Page>
    </>
  )
}

export default AddAdmin
