import React, { useContext, useEffect, useState } from "react"
import Header from "./Header"
import Page from "./Page"
import StateContext from "../StateContext"

function UpdateStock() {
  const appState = useContext(StateContext)
  const [select, setSelect] = useState("Select Product")
  const [id, setID] = useState()

  // function handilSelect() {}

  function SelectForm() {
    const [name, setName] = useState()
    const [discription, setDiscription] = useState()
    const [rate, setRate] = useState()
    const [mrp, setMrp] = useState()
    const [qty, setqty] = useState()
    const product = appState.items.filter((x) => x.id == id)
    console.log(product)
    function handileSumbit(e) {
      e.preventDefault()
    }
    return (
      <>
        <form className="my-2" onSubmit={handileSumbit}>
          <div className="d-flex flex-row mb-3">
            <div className="p-2">
              <label htmlFor="name">Product</label>
              <br />
              <input type="text" name="name" defaultValue={product[0].name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="p-2">
              <label htmlFor="name">Quntaty</label>
              <br />
              <input type="text" name="qty" defaultValue={product[0].qty} onChange={(e) => setqty(e.target.value)} />
            </div>
          </div>
          <div className="d-flex flex-row mb-3">
            <div className="p-2">
              <label htmlFor="hr">Hoursail Rate</label>
              <br />
              <input type="text" name="hr" defaultValue={product[0].rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div className="p-2">
              <label htmlFor="mrp">MRP</label>
              <br />
              <input type="text" name="mrp" defaultValue={product[0].mrp} onChange={(e) => setMrp(e.target.value)} />
            </div>
          </div>

          <div>
            <label htmlFor="disc">Discription</label>
            <br />
            <textarea cols={70} rows={10} type="text" name="name" defaultValue={product[0].discription} onChange={(e) => setDiscription(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    )
  }
  return (
    <>
      <Header />
      <Page title="Update Stocks" wide={true}>
        <h3>Update Stocks</h3>
        <div className="btn-group dropend">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {select}
          </button>
          <ul className="dropdown-menu">
            {appState.items.map((x) => (
              <li
                key={x.id}
                className="dropdown-item"
                id={x.id}
                onClick={(e) => {
                  setSelect(e.target.innerText)
                  setID(e.target.id)
                }}
              >
                {x.name}
              </li>
            ))}
          </ul>
        </div>
        {select != "Select Product" ? <SelectForm /> : ""}
      </Page>
    </>
  )
}

export default UpdateStock
