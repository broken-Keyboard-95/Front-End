"use client"
import { useState, useEffect, useRef } from "react";
import {motion} from 'framer-motion'

type EgyptData = {
  [key: string]: string[];
};


// Governorates &&  Administrative Districts
const egyptData :  EgyptData = {
        Cairo: [ "Heliopolis", "Nasr City", "Maadi", "Zamalek", "Shubra", "El Mokattam", "El Marg", "El Salam", ],
        Giza: [
        "Dokki",
        "Mohandessin",
        "Imbaba",
        "6th of October",
        "Haram",
        "El Warraq",
        "El Badrashin",
        ],
        Alexandria: [
        "Montaza",
        "Sidi Gaber",
        "Sporting",
        "Gleem",
        "Stanley",
        "Al Ibrahimia",
        "Borg El Arab",
        ],
        Minya: [
        "Minya City",
        "Maghagha",
        "Beni Mazar",
        "Samalut",
        "Matai",
        "Abu Qurqas",
        "Mallawi",
        "Deir Mawas",
        ],
        Assiut: [
        "Assiut City",
        "Abnoub",
        "Abu Tig",
        "El Badari",
        "Dairut",
        "Manfalut",
        "El Quseya",
        ],
        Aswan: ["Aswan City", "Edfu", "Kom Ombo", "Daraw", "Nasr El Nuba"],
        Luxor: ["Luxor City", "Esna", "Armant", "El Tod"],
        Sohag: [
        "Sohag City",
        "Tahta",
        "Gerga",
        "Akhmim",
        "El Balyana",
        "Dar El Salam",
        "Maragha",
        ],
        Qena: ["Qena City", "Nag Hammadi", "Deshna", "Farshut", "Qift", "Qus"],
        "Beni Suef": [
        "Beni Suef City",
        "El Fashn",
        "Beba",
        "Naser",
        "Ihnasia",
        "El Wasta",
        ],
        Fayoum: [
        "Fayoum City",
        "Ibsheway",
        "Sinnuris",
        "Tamiya",
        "Yousef El Seddik",
        ],
        Sharqia: [
        "Zagazig",
        "Belbeis",
        "10th of Ramadan",
        "Minya El Qamh",
        "Abu Hammad",
        "Kafr Saqr",
        "El Husseiniya",
        ],
        Dakahlia: [
        "Mansoura",
        "Mit Ghamr",
        "Talkha",
        "Dekernes",
        "Belqas",
        "Sherbin",
        "Gamasa",
        ],
        Gharbia: [
        "Tanta",
        "El Mahalla El Kubra",
        "Kafr El Zayat",
        "Zefta",
        "Basyoun",
        "Samannoud",
        ],
        Monufia: [
        "Shibin El Kom",
        "Menouf",
        "Ashmoun",
        "El Bagour",
        "Tala",
        "Quesna",
        ],
        KafrElSheikh: [
        "Kafr El Sheikh City",
        "Desouk",
        "Baltim",
        "Fuwwah",
        "Sidi Salem",
        "Metoubes",
        ],
        Beheira: [
        "Damanhur",
        "Kafr El Dawar",
        "Rashid",
        "Edko",
        "Kom Hamada",
        "Abu Hummus",
        ],
        Matrouh: ["Marsa Matrouh", "Siwa", "El Alamein", "El Dabaa"],
        NorthSinai: ["Arish", "Sheikh Zuweid", "Rafah", "Bir El Abd"],
        SouthSinai: [
        "Sharm El Sheikh",
        "Dahab",
        "Nuweiba",
        "Taba",
        "El Tor",
        "St. Catherine",
        ],
        PortSaid: ["Port Said City", "Port Fouad"],
        Ismailia: ["Ismailia City", "Abu Suwir", "El Qantara"],
        Suez: ["Suez City", "Ain Sokhna"],
        RedSea: ["Hurghada", "Safaga", "Quseir", "Marsa Alam", "Shalateen", "Halayeb"],
};

export default function EgyptSelect({location} : {location:boolean}) {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const secWrapperRef = useRef<HTMLDivElement>(null);
    const governorateInputRef = useRef<HTMLInputElement>(null);
    const districtInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleClickOutside(event:any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenGovernomentList(false);
            }
            if (secWrapperRef.current && !secWrapperRef.current.contains(event.target)) {
                setOpenDistrictList(false);
            }
            
        }

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    const [selectGoverorate, setSelectGovernorate] = useState("")
    const [searchGovernorate, setSearchGovernorate] = useState("")

    const [searchDistrict, setSearchDistrict] = useState("")


    const [openGovernomentList, setOpenGovernomentList] = useState(false)
    const [openDistrictList, setOpenDistrictList] = useState(false)




    // all governorates
const governorates = () =>{

    if(!governorateInputRef.current?.value)
        return Object.keys(egyptData).map((governorate, index) =>{
            return <div  key={index} 
                        onClick={() => {setSelectGovernorate(governorate); setOpenGovernomentList(false); setSearchDistrict('')}}
                        className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer">{governorate}</div>
            })
    else{
        const governorates:string[] = Object.keys(egyptData)

        const seachedGovernorate = governorates.filter((gov) => gov.toLocaleLowerCase().includes(searchGovernorate.toLocaleLowerCase()))
        
        if(seachedGovernorate.length === 0) 
            return <p className="text-gray-300 flex items-center h-full justify-center capitalize">not found</p>
        
        return seachedGovernorate.map((governorate, index) =>{
            return <div  key={index} 
                        onClick={() => {setSelectGovernorate(governorate); setOpenGovernomentList(false); setSearchDistrict('')}}
                        className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer">{governorate}</div>
            })
    }
} 




const districts = () => {
    const governorates = Object.keys(egyptData)
    const governorate: string | undefined = governorates.find((gov:string) =>   gov === searchGovernorate || gov === selectGoverorate )
    
    if(!governorate) return <p className="text-gray-300 flex items-center h-full justify-center capitalize text-sm">not found, check the governorate field</p>
    
    const districts: string[] = egyptData[governorate]
 
    if(!districtInputRef.current?.value)
    return districts.map((district, index) =>{
            return <div  key={index} 
                        onClick={() => {setSearchDistrict(district); setOpenDistrictList(false)}}
                        className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer">{district}</div>
            })
    else{

        const searchedDistricts = districts.filter((district) =>{
            return district.toLocaleLowerCase().includes(searchDistrict.toLocaleLowerCase())
        })

        return searchedDistricts.map((distric,index) => 
            <div className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer" key={index}>{distric}</div>)
        
    }
}

 
    const handleDistrictList = () =>{
        if(!governorateInputRef.current?.value){
            setOpenDistrictList(false)
        }
    }



if(location)
return (
    <div className={`flex gap-8 w-full max-w-[650px]`}>

        {/* Governorate */}
        <motion.div className="w-1/2 relative space-y-4" ref={wrapperRef}
                initial={{x:-50, opacity:0}} animate={ location ? {x:0, opacity:1} : {x:-50, opacity:0}}> 

            <input type="text" placeholder="Governorate" value={selectGoverorate || searchGovernorate } 
                    onChange={(e) => {setSearchGovernorate(e.target.value) ; setSelectGovernorate('')} }
                    onFocus={() => setOpenGovernomentList(true)} ref={governorateInputRef}
                    className="w-full outline-none py-2 px-4 text-sm rounded-lg dark:bg-myBlack-900 border-[1.4px] dark:border-myBlack-700"  />

            <div 
                className={`${!openGovernomentList && 'invisible'}  h-[200px] overflow-y-scroll border-[1.4px] dark:border-myBlack-700 ESS pl-1`}
                >{governorates()}
            </div>
        </motion.div> 




        {/* Administrative District */}
        <motion.div className="w-1/2 space-y-4" ref={secWrapperRef} initial={{x:50, opacity:0}} animate={ location ? {x:0, opacity:1} : {x:50, opacity:0}}>
            
            <input type="text" placeholder="Administrative District" 
                className="w-full outline-none py-2 px-4 text-sm rounded-lg dark:bg-myBlack-900 border-[1.4px] dark:border-myBlack-700"
                onChange={(e) => setSearchDistrict(e.target.value)} value={searchDistrict}
                onFocus={() => setOpenDistrictList(true)} ref={districtInputRef}
                onClick={handleDistrictList}
                
                />
                
                
            <div 
                className={`${!openDistrictList && 'invisible'}  h-[200px] overflow-y-scroll border-[1.4px] dark:border-myBlack-700 ESS pl-1`}
                >{districts()}
            </div>

        </motion.div>

    </div>    
)}