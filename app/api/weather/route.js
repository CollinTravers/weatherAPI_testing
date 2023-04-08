import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("Inside the route")

  const lat = '-42.1'
  const lon = '72.1'
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`);
  
  const data = await res.json();

  console.log("received data")
  console.log(data)

  return NextResponse.json({ data })
}
