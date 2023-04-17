import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";

let lat = '42.3399'
let lon = '-71.0899'

export async function GET(request) {

  const origin = request.headers.get('origin')

  const remaining = await limiter.removeTokens(1)

  if (remaining < 0){
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Requests",
      header: {
        'Access-Control-Allow-Origin': origin || '*',
        'Content-Type': 'text/plain',
      }
    })
  }

  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.API_KEY}`, { cache: 'no-store' });
  
  const data = await res.json();

  return NextResponse.json({ data }, {
    headers: {
      'Access-Control-Allow-Origin': origin || "*",
      'Content-Type': 'application/json',
    }
  })
}

export async function POST(request) {
  const res = await request.json()

  lat = res.lat
  lon = res.lon

  return NextResponse.json({ res })
}
