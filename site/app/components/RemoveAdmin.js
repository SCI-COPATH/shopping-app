import React, { useContext, useEffect, useState } from "react"
import Header from "./Header"
import Page from "./Page"
import StateContext from "../StateContext"
import Axios from "axios"
import DispachContext from "../DispachContext"

function RemoveAdmin() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  console.log(appState.accounts)

  async function handilRemoveAdmin(id) {
    console.log(id)
    try {
      const responce = await Axios.post("/update-user-type", { token: appState.user.token, id: id })
      console.log(responce.data)
      const accounts = await Axios.get("/get-user-accounts")
      appDispach({ type: "set-accounts", accounts: accounts.data.data })
      console.log(accounts.data.data)
    } catch (error) {}
  }
  return (
    <>
      <Header />
      <Page title="Remove Admin" wide={true}>
        <ul className="list-group list-group-flush">
          {appState.accounts
            .filter((x) => x.userType == "admin" && x.userName != appState.user.userName)
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
                        handilRemoveAdmin(e.target.id)
                      }}
                    >
                      Remove Admin
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

export default RemoveAdmin
