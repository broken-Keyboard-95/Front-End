"use client"

import MainNavbar from "../components/Navbars/MainNavbar"
import PrompetMessage from "../components/mainPage/PrompetMessage"
import Prompet from "../components/mainPage/Prompet"
import Lists from "../components/mainPage/Lists"
import { useState } from "react"

export default function Home() {

    const [isSearch, setIsSearch] = useState(false)
    const [location, setLocation] = useState(false)

    const search = () =>{

    }

  return (
    <>
      <div className="flex flex-col items-center justify-end sm:justify-center min-h-screen
                     gap-4 overflow-hidden p-4 relative">

        <MainNavbar/> 

        <PrompetMessage isSearch={isSearch}/>

        <Prompet setIsSearch={setIsSearch} isSearch={isSearch} setLocation={setLocation}/>

        <Lists location={location} />
        
      </div>
      
    </>
  )
}
