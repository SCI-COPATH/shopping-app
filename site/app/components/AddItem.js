import React, { useContext, useEffect, useState } from "react"
import Header from "./Header"
import Page from "./Page"
import Axios from "axios"
import StateContext from "../StateContext"
import DispachContext from "../DispachContext"
import { useNavigate } from "react-router-dom"

function AddItem() {
  const appStatus = useContext(StateContext)
  const appDispach = useContext(DispachContext)
  const naviater = useNavigate()
  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [catagory, setCatagory] = useState()
  const [qty, setQty] = useState()
  const [mrp, setMrp] = useState()
  const [realRate, setRealRate] = useState()
  const [brand, setBrand] = useState()
  const [discription, setDiscription] = useState()
  async function handilSubmit(e) {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("token", appStatus.user.token)
      formData.append("name", name)
      formData.append("catagory", catagory)
      formData.append("qty", qty)
      formData.append("mrp", mrp)
      formData.append("realRate", realRate)
      formData.append("brand", brand)
      formData.append("discription", discription)

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      const responce = await Axios.post("/addItems", formData, config)
      console.log(responce.data.data)
    } catch (error) {
      try {
        if (error.response.data == "Invalid Token" || error.response.data == "Unauthorized") {
          appDispach({ type: "logout" })
          naviater("/")
        }
      } catch (error) {
        console.log("Error")
      }
      console.log(error.response.data)
    }
  }
  return (
    <>
      <Header />
      <Page title="Add item" formMode={true}>
        <form className="intermediateForm" onSubmit={handilSubmit}>
          <h2>Add Item </h2>
          <div className="form-ele">
            <div>
              <label htmlFor="name">Name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Samsung Galexy S23" />
            </div>
            <div>
              <label htmlFor="catagory">Catagory</label>
              <input onChange={(e) => setCatagory(e.target.value)} type="text" id="catagory" placeholder="Electronics" />
            </div>
            <div>
              <label htmlFor="qunity">Quntaty</label>
              <input onChange={(e) => setQty(e.target.value)} type="number" id="qunity" placeholder="100" />
            </div>
            <div>
              <label htmlFor="rate">Horsail prise</label>
              <input onChange={(e) => setRealRate(e.target.value)} type="number" id="rate" placeholder="80000" />
            </div>
            <div>
              <label htmlFor="MRP">MRP</label>
              <input onChange={(e) => setMrp(e.target.value)} type="number" id="MRP" placeholder="90000" />
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input onChange={(e) => setBrand(e.target.value)} type="text" id="brand" placeholder="Samsung" />
            </div>
            <div>
              <label htmlFor="disc">Discription</label>
              <br />
              <textarea onChange={(e) => setDiscription(e.target.value)} id="disc" cols="60" rows="10" placeholder="Discription"></textarea>
            </div>
            <div>
              <label htmlFor="image">Product Image</label>
              <input type="file" accept="image/*" id="image" onChange={(e) => setImage(e.target.files[0])} />
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
