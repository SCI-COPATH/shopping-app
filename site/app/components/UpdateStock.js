import React, { useContext, useEffect, useState } from "react"
import Header from "./Header"
import Page from "./Page"
import StateContext from "../StateContext"
import Axios from "axios"
import DispachContext from "../DispachContext"

function UpdateStock() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  const [select, setSelect] = useState("Select Product")
  const [id, setID] = useState()

  // function handilSelect() {}

  function SelectForm() {
    const product = appState.items.filter((x) => x.id == id)
    const [name, setName] = useState(product[0].name)
    const [discription, setDiscription] = useState(product[0].discription)
    const [rate, setRate] = useState(product[0].rate)
    const [mrp, setMrp] = useState(product[0].mrp)
    const [qty, setqty] = useState(product[0].qty)

    // setID(id)

    async function handileSumbit(e) {
      console.log(id)
      e.preventDefault()
      try {
        const responce = await Axios.post("/update-items", { token: appState.user.token, id, name, qty, mrp, rate, discription })
        console.log(responce.data.data)
        appDispach({ type: "update-items", items: responce.data.data })
      } catch (error) {
        if (error.response.data == "Invalid Token" || error.response.data == "Unauthorized") {
          appDispach({ type: "logout" })
          naviater("/")
        }
      }

      // token, id, name, qty, mrp, realRate, discription'
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
