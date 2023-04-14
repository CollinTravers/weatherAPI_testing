import React from "react"

export default function Header(prop){
  return(
    <header className="flex h-20 content-center bg-blue-300 border-b-2 border-black">
      <div className="block text-center mx-auto my-auto text-4xl font-bold font-sans">
        Conditions in {prop.city}
      </div>
    </header>
  )
}