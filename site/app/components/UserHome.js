import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import StateContext from "../StateContext"

{
  /* <div class="card" style={{ width: "18rem" }}>
          <small className="p-1">brant</small>
          <div>
            <img src="http://localhost:8081/images/items/image_1702707054207.jpg" class="card-img-top" alt="img" />
          </div>

          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <strong>250 rs</strong>
          </div>
          <ul class="list-group list-group-flush"></ul>
          <div class="card-body">
            <button type="button" class="btn btn-dark mx-1">
              Add to cart
              <i class="fa-solid fa-cart-shopping p-1"></i>
            </button>
            <button type="button" class="btn btn-primary  mx-1">
              View More
            </button>
            
          </div>
        </div> */
}

function UserHome() {
  const appState = useContext(StateContext)

  const [select, setSelect] = useState("All")

  let catagores = appState.items.map((x) => x.catagory).filter((item, index) => appState.items.map((x) => x.catagory).indexOf(item) === index)
  console.log(catagores)
  function Products() {
    let show = select == "All" ? appState.items : appState.items.filter((x) => x.catagory == select)
    console.log(show)

    return (
      <>
        {show.map((x) => {
          return (
            <div className="card m-1 " style={{ width: "18rem", height: "min-content" }}>
              <small className="p-1">{x.brand}</small>
              <div>
                <img src={`http://localhost:8081/images/items/${x.imgae}`} className="card-img-top" alt={x.name} />
              </div>

              <div className="card-body ">
                <h5 className="card-title">{x.name}</h5>
                <strong>{x.mrp}/- Rs</strong>
              </div>
              <ul className="list-group list-group-flush" key={x.id}></ul>
              <div className="card-body px-1 py-4">
                <button type="button" className="btn btn-dark mx-1 " id={x.id}>
                  Add to cart
                  <i className="fa-solid fa-cart-shopping p-1"></i>
                </button>
                <button type="button" className="btn btn-primary  mx-1" id={x.id}>
                  View More
                </button>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <>
      <Page title="home" wide={true}>
        <div className="btn-group dropend">
          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            filter {select}
          </button>
          <ul className="dropdown-menu">
            {catagores.map((x) => (
              <li
                key={x.index}
                className="dropdown-item"
                // id={x.id}
                onClick={(e) => {
                  setSelect(e.target.innerText)
                  // setID(e.target.id)
                }}
              >
                {x}
              </li>
            ))}

            <li
              key={-1}
              className="dropdown-item"
              // id={x.id}
              onClick={(e) => {
                setSelect(e.target.innerText)
                // setID(e.target.id)
              }}
            >
              All
            </li>
          </ul>
        </div>

        <div className="row justify-content-between">
          <Products />
        </div>
      </Page>
    </>
  )
}

export default UserHome
