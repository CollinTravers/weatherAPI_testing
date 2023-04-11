import { NextResponse } from "next/server";

let zipcode = '02115'
let countrycode = 'US'

export async function GET(request) {
  console.log("Inside the route")

  const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${process.env.API_KEY}`);
  
  const data = await res.json();

  console.log("received data")
  console.log(data)

  return NextResponse.json({ data })
}

export async function POST(request) {
  console.log("-------- INSIDE THE LOCATION POST ---------")
  
  const res = await request.json()
  console.log(res)

  zipcode = res.zipcode
  countrycode = res.countrycode

  return NextResponse.json({ res })
}