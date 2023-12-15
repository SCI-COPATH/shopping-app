import React, { useEffect } from "react"
import Header from "./Header"
import Page from "./Page"

function AddItem() {
  return (
    <>
      <Header />
      <Page title="Add item" formMode={true}>
        <h1>Add item</h1>
      </Page>
    </>
  )
}

export default AddItem
