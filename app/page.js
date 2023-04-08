"use client";

import './globals.css'
import { use, useState } from "react"

export default function Home() {

  const [temp, setTemp] = useState(0)

  async function makeWeatherCall () {
    const response = await fetch('/api/weather')
    const data = await response.json()

    //Data is nested, so we need to get the actual data temp
    const dataTemp = data.data.main.temp

    console.log(dataTemp)

    setTemp(dataTemp)
  }

  return (
    <div>
      <div className="bg-green-700 m-5 p-4">Temp: {temp}</div>
      <button className="bg-red-500 m-5 p-4 rounded" onClick={makeWeatherCall}>Button</button>
    </div>
  )
}
