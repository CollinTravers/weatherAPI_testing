import { NextResponse } from "next/server";

let lat = '42.3399'
let lon = '-71.0899'

export async function GET(request) {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`);
  
  const data = await res.json();

  return NextResponse.json({ data })
}

export async function POST(request) {
  const res = await request.json()

  lat = res.lat
  lon = res.lon

  return NextResponse.json({ res })
}
