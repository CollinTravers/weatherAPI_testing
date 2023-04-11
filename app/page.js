"use client";

import './globals.css'
import { useState } from "react"
import { kToF } from './getFahrenheit';

export default function Home() {

  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState('Boston')

  async function getWeatherCall () {
    const response = await fetch('/api/weather')
    const data = await response.json()

    //Data is nested, so we need to get the actual data temp
    const dataTemp = data.data.main.temp

    console.log(dataTemp)
    let convertedTemp = kToF(dataTemp)
    setTemp(convertedTemp)
  }

  async function getLocationInformation(){
    const response = await fetch('/api/location')
    const data = await response.json()

    //Data is nested, so we need to get the actual data temp
    const dataLat = String(data.data.lat)
    const dataLon = String(data.data.lon)

    console.log(dataLat)
    console.log(dataLon)

    setCity(data.data.name)

    return {
      lat: dataLat, 
      lon: dataLon
    }
  }

  async function handleSubmit(event){
    // Prevent the browser from reloading the page
    event.preventDefault();

    console.log("User has submitted")

    // Read the form data
    const form = event.target;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());

    // You can pass formData as a fetch body directly:
    await fetch('/api/location', { method: form.method, body: JSON.stringify(formJson) });

    //Now we want to update the temperature field, instead of clicking another button
    let cords = await getLocationInformation()

    console.log("LATITUDE: ", cords.lat, cords.lon)

    console.log(JSON.stringify(cords))

    //now we want to fetch the weather from the original API
    await fetch('/api/weather', { method: form.method, body: JSON.stringify(cords) });

    //then call the GET request to update everything
    await getWeatherCall()

  }

  return (
    <div>
      <form className="m-5 p-4" method="POST" onSubmit={handleSubmit}>
        <label className="m-2 p-2">
          ZIP CODE: 
          <input className="border-solid border-2 m-2" name="zipcode" type='text'></input>
        </label>
        <label className="m-2 p-2">
          COUNTRY CODE:
          <input className="border-solid border-2 m-2" name="countrycode" type='text'></input>
        </label>
        <button className="m-5 p-4 bg-red-500 border-solid border-2 rounded"type="submit">Submit Form</button>
      </form>
      <div className="bg-green-300 m-5 p-4">It is currently {temp} degrees in {city}</div>
    </div>
  )
}
