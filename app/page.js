"use client";

import './globals.css'
import { useEffect, useState } from "react"
import Header from './header.js';
import Weather_Card from './weather_card';
import { convertToTime } from './convertToTime';
import { windDirectionToCompass } from './windDirectionToCompass';
import sunnyPic from '../public/sunny.svg'
import compassPic from '../public/compass.svg'
import humidityPic from '../public/humidity.svg'
import moonPic from '../public/moon.svg'
import wakeupPic from '../public/wakeup.svg'
import windPic from '../public/wind.svg'
import temperaturePic from '../public/temperature.svg'

export default function Home() {

  const [weatherData, setWeatherData] = useState({
    weather: '',
    temp: '',
    humidity: '',
    windSpeed: '',
    windDirection: '',
    sunrise: '',
    sunset: '',
  })
  const [city, setCity] = useState('Boston')

  //Want to get initial temperature
  useEffect(() => {
    getWeatherCall();
  }, []);

  async function getWeatherCall () {
    const response = await fetch('/api/weather')

    //init data
    let data = ''

    if (response.status === 200){
      data = await response.json()
    } else {
      //status was bad, such as a 429
      alert("Too many requests, try again later")
      return
    }
    

    //Data is nested, so we need to get the actual data temp
    const dataTemp = String(data.data.main.temp)

    //setting weather data
    const weather = String(data.data.weather[0].main)
    const humidity = String(data.data.main.humidity)
    const windSpeed = String(data.data.wind.speed)

    const compassDir = windDirectionToCompass(data.data.wind.deg)

    const windDirection = String(compassDir)

    const sunriseDate = convertToTime(data.data.sys.sunrise)
    const sunsetDate = convertToTime(data.data.sys.sunset)

    const sunrise = String(sunriseDate)
    const sunset = String(sunsetDate)

    setWeatherData({
      weather: weather,
      temp: dataTemp,
      humidity: humidity,
      windSpeed: windSpeed,
      windDirection: windDirection,
      sunrise: sunrise,
      sunset: sunset,
    })
  }

  async function getLocationInformation(){
    const response = await fetch('/api/location')

    const data = await response.json()

    let code = data.data.cod

    //GOOD status from the API
    //This API will return a cod field only when the params are wrong, we only want to return information when its a good status (code = undefined)
    if (code === undefined) {
      //Data is nested, so we need to get the actual data temp
      const dataLat = String(data.data.lat)
      const dataLon = String(data.data.lon)

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

    // Read the form data
    const form = event.target;
    const formData = new FormData(form);

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());

    // You can pass formData as a fetch body directly:
    await fetch('/api/location', { method: form.method, body: JSON.stringify(formJson) });

    //Now we want to update the temperature field, instead of clicking another button
    let cords = await getLocationInformation()

    if (cords != undefined){
      //now we want to fetch the weather from the original API
      await fetch('/api/weather', { method: form.method, body: JSON.stringify(cords) });

      //then call the GET request to update everything
      await getWeatherCall()
    }
  }

  return (
    <div>
      <Header city={city}/>
      <div className="block text-center mx-auto my-auto font-sans">
        <form className="mx-5 p-4" method="POST" onSubmit={handleSubmit}>
          <label className="m-2 p-2">
            ZIP CODE: 
            <input className="border-solid border-2 m-2 w-20" name="zipcode" type='text' placeholder='02115'></input>
          </label>
          <label className="m-2 p-2">
            COUNTRY CODE:
            <input className="border-solid border-2 m-2 w-20" name="countrycode" type='text' placeholder='US'></input>
          </label>
          <button className="m-5 p-1 bg-gray-100 border-solid border-2 rounded"type="submit">Submit Form</button>
        </form>
      </div>
      <section className='flex justify-evenly my-10 mx-2 font-sans'>
        <div className='grid grid-flow-row gap-8 lg:grid-cols-7 md:grid-cols-3 sm:grid-cols-2'>
          <Weather_Card data={weatherData.weather} title={"Conditions"} text={""} image={sunnyPic}/>
          <Weather_Card data={weatherData.temp} title={"Temperature"} text={'\u2109'} image={temperaturePic}/>
          <Weather_Card data={weatherData.humidity} title={"Humidity"} text={"%"} image={humidityPic}/>
          <Weather_Card data={weatherData.windSpeed} title={"Wind Speed"} text={"mph"} image={windPic}/>
          <Weather_Card data={weatherData.windDirection} title={"Wind Direction"} text={""} image={compassPic}/>
          <Weather_Card data={weatherData.sunrise} title={"Sunrise"} text={""} image={wakeupPic}/>
          <Weather_Card data={weatherData.sunset} title={"Sunset"} text={""} image={moonPic}/>
        </div>
      </section>
    </div>
  )
}
