import { NextResponse } from "next/server";

let zipcode = '02115'
let countrycode = 'US'

export async function GET(request) {
  const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${countrycode}&appid=${process.env.API_KEY}`);
  
  const data = await res.json();

  return NextResponse.json({ data })
}

export async function POST(request) {
  const res = await request.json()

  zipcode = res.zipcode
  countrycode = res.countrycode

  return NextResponse.json({ res })
}