"use client";

import './globals.css'
import { useEffect, useState } from "react"
import { kToF } from './getFahrenheit';
import Header from './header.js';

export default function Home() {

  const [temp, setTemp] = useState()
  const [city, setCity] = useState('Boston')

  //Want to get initial temperature
  useEffect(() => {
    getWeatherCall();
  }, []);

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

    let code = data.data.cod

    console.log(code)

    //GOOD status from the API
    //This API will return a cod field only when the params are wrong, we only want to return information when its a good status (code = undefined)
    if (code === undefined) {
      console.log("CODE: ", String(code))

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
    } else {
      alert("Please enter the fields correctly")
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

    console.log(cords)

    if (cords != undefined){
      //now we want to fetch the weather from the original API
      await fetch('/api/weather', { method: form.method, body: JSON.stringify(cords) });

      //then call the GET request to update everything
      await getWeatherCall()
    }
  }

  return (
    <div>
      <Header />
      <form className="m-5 p-4" method="POST" onSubmit={handleSubmit}>
        <label className="m-2 p-2">
          ZIP CODE: 
          <input className="border-solid border-2 m-2 w-20" name="zipcode" type='text' placeholder='02115'></input>
        </label>
        <label className="m-2 p-2">
          COUNTRY CODE:
          <input className="border-solid border-2 m-2" name="countrycode" type='text' placeholder='US'></input>
        </label>
        <button className="m-5 p-1 bg-red-500 border-solid border-2 rounded"type="submit">Submit Form</button>
      </form>
      <div className="bg-green-300 m-5 p-4">It is currently {temp} degrees in {city}</div>
    </div>
  )
}
