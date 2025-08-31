"use client"

import MainNavbar from "../components/Navbars/MainNavbar"
import PrompetMessage from "../components/mainPage/PrompetMessage"
import Prompet from "../components/mainPage/Prompet"
import Lists from "../components/mainPage/Lists"
import { useState } from "react"

import { sendMedicine } from "../actions/sendMedicine"


type EgyptData = {
  [key: string]: string[];
};

// all governorates and his adminstrative districts
const egyptData :  EgyptData = {
        Cairo: [ "Heliopolis", "Nasr City", "Maadi", "Zamalek", "Shubra", "El Mokattam", "El Marg", "El Salam", ],
        Giza: [ "Dokki", "Mohandessin", "Imbaba", "6th of October", "Haram", "El Warraq", "El Badrashin", ],
        Alexandria: [ "Montaza", "Sidi Gaber", "Sporting", "Gleem", "Stanley", "Al Ibrahimia", "Borg El Arab", ],
        Minya: [ "Minya City", "Maghagha", "Beni Mazar", "Samalut", "Matai", "Abu Qurqas", "Mallawi", "Deir Mawas",],
        Assiut: [ "Assiut City", "Abnoub", "Abu Tig", "El Badari", "Dairut", "Manfalut", "El Quseya",],
        Aswan: ["Aswan City", "Edfu", "Kom Ombo", "Daraw", "Nasr El Nuba"],
        Luxor: ["Luxor City", "Esna", "Armant", "El Tod"],
        Sohag: [ "Sohag City", "Tahta", "Gerga", "Akhmim", "El Balyana", "Dar El Salam", "Maragha", ],
        Qena: ["Qena City", "Nag Hammadi", "Deshna", "Farshut", "Qift", "Qus"],
        "Beni Suef": ["Beni Suef City","El Fashn","Beba","Naser","Ihnasia","El Wasta",],
        Fayoum: ["Fayoum City","Ibsheway","Sinnuris","Tamiya","Yousef El Seddik",],
        Sharqia: ["Zagazig","Belbeis","10th of Ramadan","Minya El Qamh","Abu Hammad","Kafr Saqr","El Husseiniya", ],
        Dakahlia: ["Mansoura","Mit Ghamr","Talkha","Dekernes","Belqas","Sherbin","Gamasa",],
        Gharbia: ["Tanta","El Mahalla El Kubra","Kafr El Zayat","Zefta","Basyoun","Samannoud",],
        Monufia: ["Shibin El Kom","Menouf","Ashmoun","El Bagour","Tala","Quesna",],
        KafrElSheikh: ["Kafr El Sheikh City","Desouk","Baltim","Fuwwah","Sidi Salem","Metoubes",],
        Beheira: ["Damanhur","Kafr El Dawar","Rashid","Edko","Kom Hamada","Abu Hummus",],
        Matrouh: ["Marsa Matrouh", "Siwa", "El Alamein", "El Dabaa"],
        NorthSinai: ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd"],
        SouthSinai: [ "Sharm El Sheikh", "Dahab", "Nuweiba", "Taba", "El Tor", "St. Catherine", ],
        PortSaid: ["Port Said City", "Port Fouad"],
        Ismailia: ["Ismailia City", "Abu Suwir", "El Qantara"],
        Suez: ["Suez City", "Ain Sokhna"],
        RedSea: ["Hurghada", "Safaga", "Quseir", "Marsa Alam", "Shalateen", "Halayeb"],
};


export default function Home() {

    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [location, setLocation] = useState<boolean>(false)
    const [unValidData, setUnValidData] = useState<string>('')
    
    const [searchData, setSearchData] = useState({medicine:"", governorate:"", district:""})

    // checking from data before send to back end
    const checkData = async () => {
        if(!searchData.medicine){
          setUnValidData('check medicine field');
          return null
        }  

        const governorates = Object.keys(egyptData)
        const checkGovernorate = 
        governorates.find((gov: string) => gov.toLocaleLowerCase() === searchData.governorate.toLocaleLowerCase())
        if(!checkGovernorate) {
           setUnValidData("check your governorate")
           return null
        }

        const districts = egyptData[checkGovernorate]
        const checkDistricts = 
        districts.find((dis: string) => dis.toLocaleLowerCase() === searchData.district.toLocaleLowerCase())
        if(!checkDistricts) {
          setUnValidData("check your district")
          return null
        }
        
        setUnValidData('')
        console.log(searchData)
        const res = await sendMedicine(searchData)
        return res
    }


  return (
    <>
      <div className="flex flex-col items-center justify-evenly sm:justify-center min-h-screen
                     gap-4 overflow-hidden p-4 relative">

        <MainNavbar/> 

        <PrompetMessage isSearch={isSearch}/>

        <Prompet setIsSearch={setIsSearch} isSearch={isSearch} setLocation={setLocation}
                  setSearchData={setSearchData} checkData={checkData}/>

        <Lists location={location} setSearchData={setSearchData} egyptData={egyptData}/>
        
      </div>
      
    </>
  )
}
