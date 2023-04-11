import { NextResponse } from "next/server";

let lat = '-42.1'
let lon = '72.1'

export async function GET(request) {
  console.log("Inside the route")

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
  
  const data = await res.json();

  console.log("received data")
  console.log(data)

  return NextResponse.json({ data })
}

export async function POST(request) {
  console.log("-------- INSIDE THE POST ---------")
  
  const res = await request.json()
  console.log(res)
  console.log(res.Lat)
  lat = res.Lat
  lon = res.Lon
  console.log("POSTING")
  return NextResponse.json({ res })
}
