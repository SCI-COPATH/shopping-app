import React, { useEffect } from "react"
import Header from "./Header"
import Page from "./Page"

function AddItem() {
  return (
    <>
      <Header />
      <Page title="Add item" formMode={true}>
        <form className="intermediateForm">
          <h2>Add Item </h2>
          <div className="form-ele">
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Samsung Galexy S23" />
            </div>
            <div>
              <label htmlFor="Catagory">Catagory</label>
              <input type="text" id="catagory" placeholder="Electronics" />
            </div>
            <div>
              <label htmlFor="qunity">Quntaty</label>
              <input type="number" id="qunity" placeholder="100" />
            </div>
            <div>
              <label htmlFor="rate">Horsail prise</label>
              <input type="number" id="rate" placeholder="80000" />
            </div>
            <div>
              <label htmlFor="MRP">MRP</label>
              <input type="number" id="MRP" placeholder="90000" />
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input type="text" id="brand" placeholder="Samsung" />
            </div>
            <div>
              <label htmlFor="disc">Discription</label>
              <br />
              <textarea id="disc" cols="60" rows="10" placeholder="Discription"></textarea>
            </div>
            <div>
              <label htmlFor="image">Product Image</label>
              <input type="file" id="image" />
            </div>
            <button className="mt-2 mb-5 btn btn-primary" type="submit">
              Add item
            </button>
          </div>
        </form>
      </Page>
    </>
  )
}

export default AddItem
