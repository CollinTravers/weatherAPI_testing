"use client";

import './globals.css'
import { use, useState } from "react"

export default function Home() {

  const [temp, setTemp] = useState(0)
  const [lat, setLat] = useState(0)
  const [lon, setLong] = useState(0)

  async function makeWeatherCall () {
    const response = await fetch('/api/weather')
    const data = await response.json()

    //Data is nested, so we need to get the actual data temp
    const dataTemp = data.data.main.temp

    console.log(dataTemp)

    setTemp(dataTemp)
  }

  function handleSubmit(e){
    // Prevent the browser from reloading the page
    e.preventDefault();

    console.log("User has submitted")

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    console.log("FormData: ", formData)

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());

    // You can pass formData as a fetch body directly:
    fetch('/api/weather', { method: form.method, body: formJson });

    console.log(formJson);
  }

  return (
    <div>
      <form className="m-5 p-4" method="POST" onSubmit={handleSubmit}>
        <label>
          Latitude: 
          <input className="border-solid border-2" name="Lat" type='text'></input>
        </label>
        <label>
          Longitude:
          <input className="border-solid border-2" name="Lon" type='text'></input>
        </label>
        <button className="m-5 p-4 bg-red-500 border-solid border-2 rounded"type="submit">Submit Form</button>
      </form>
      <div className="bg-green-700 m-5 p-4">Temp: {temp}</div>
      <button className="bg-red-500 m-5 p-4 rounded" onClick={makeWeatherCall}>Button</button>
    </div>
  )
}
