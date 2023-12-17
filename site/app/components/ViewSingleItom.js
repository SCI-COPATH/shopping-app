import React, { useContext, useEffect, useState } from "react"
import StateContext from "../StateContext"
import Header from "./Header"
import Page from "./Page"
import Axios from "axios"
import DispachContext from "../DispachContext"
import { useNavigate } from "react-router-dom"
function ViewSingleItom() {
  const appState = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  const [click, setClick] = useState(false)

  console.log(appState.items)
  console.log(appState.items.filter((x) => x.id == appState.selectedItem))
  const element = appState.items.filter((x) => x.id == appState.selectedItem)[0]

  function Buying() {
    return <>order {element.name}</>
  }
  function BuyButForm() {
    const [qty, setQty] = useState(1)
    const nav = useNavigate()
    async function handilBuy(e) {
      e.preventDefault()

      // alert("sas")

      // console.log(element.id)
      console.log(appState.user.userId)
      let newQty = element.qty - qty
      setClick(true)

      try {
        // const res = await Axios.post("/update-items-qty", { id: element.id, qty: newQty })
        // console.log(res.data.message)
        // const itemList = await Axios.get("/product-list")
        // console.log(itemList.data.data)
        // appDispach({ type: "update-items", items: itemList.data.data })
        await Axios.post("/place-order", { itemId: element.id, qty, userId: appState.user.userId })
      } catch (error) {
        console.log("Error")
      }
      setTimeout(function () {
        setClick(false)
        nav("/")
      }, 500)
    }
    return (
      <form className="d-flex" onSubmit={handilBuy}>
        <div className="input-group flex-nowrap w-50">
          <span className="input-group-text" id="addon-wrapping">
            Qty
          </span>
          <input type="number" onChange={(e) => setQty(e.target.value)} className="form-control " placeholder="1" aria-label="number" aria-describedby="addon-wrapping" />
        </div>
        <button type="submit" className="btn btn-dark mx-1 ">
          buy now
          <i className="fa-solid fa-cart-shopping p-1"></i>
        </button>
      </form>
    )
  }
  function ShowItem() {
    return (
      <div className="card mb-3" style={{ maxWidth: "100%" }}>
        <p className="card-text p-1">
          <small className="text-body-secondary">{element.brand}</small>
        </p>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`http://localhost:8081/images/items/${element.imgae}`} className="img-fluid rounded-start" alt={element.name} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{element.name}</h5>
              <p className="card-text">{element.discription}</p>
              <strong className="card-text">{element.rate}/- Rs</strong>
            </div>
            <div className="card-body px-1 py-4">{element.qty > 0 ? <BuyButForm /> : "Out of stock"}</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Header />
      <Page title={element.name} wide={true}>
        {click ? <Buying /> : <ShowItem />}
      </Page>
    </>
  )
}

export default ViewSingleItom
