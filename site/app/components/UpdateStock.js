import React, { useEffect } from "react"
import Header from "./Header"
import Page from "./Page"

function UpdateStock() {
  return (
    <>
      <Header />
      <Page title="Update Stocks" wide={true}>
        <h1>update stocks</h1>
      </Page>
    </>
  )
}

export default UpdateStock
