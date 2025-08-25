"use client"
import { useState, useEffect, useRef, memo} from "react";
import {motion} from 'framer-motion'

// tpye of "egyptData" 

type EgyptData = {
  [key: string]: string[];
};

interface ListsProps {
  location: boolean
  setSearchData: React.Dispatch<React.SetStateAction<{ medicine: string, governorate: string, district: string }>>
  egyptData:EgyptData
}


// Governorates &&  Administrative Districts


export default function EgyptSelect({location, setSearchData, egyptData} : ListsProps) {

    // refs
    const wrapperRef = useRef<HTMLDivElement>(null);
    const secWrapperRef = useRef<HTMLDivElement>(null);
    const governorateInputRef = useRef<HTMLInputElement>(null);
    const districtInputRef = useRef<HTMLInputElement>(null);


    // close lists when click on any space on screen except list I open
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
            return () => document.removeEventListener("mousedown", handleClickOutside); // clear envent
    }, []);

    



    const [selectGoverorate, setSelectGovernorate] = useState("")
    const [searchGovernorate, setSearchGovernorate] = useState("")

    const [searchDistrict, setSearchDistrict] = useState("")


    const [openGovernomentList, setOpenGovernomentList] = useState(false)
    const [openDistrictList, setOpenDistrictList] = useState(false)




    // all governorates
const governorates = () =>{

    // return all governorates
    if(!governorateInputRef.current?.value)
        return Object.keys(egyptData).map((governorate, index) =>{
            return <div  key={index} 
                        onClick={() => {setSelectGovernorate(governorate); setOpenGovernomentList(false);
                                 setSearchDistrict(''); setSearchData((prev) => ({ ...prev, governorate: governorate})) }}
                        className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer">{governorate}</div>
            })

    // return searched governorates
    else{
        const governorates:string[] = Object.keys(egyptData)

        const seachedGovernorate = governorates.filter((gov) => gov.toLocaleLowerCase().includes(searchGovernorate.toLocaleLowerCase()))
        
        if(seachedGovernorate.length === 0) 
            return <p className="text-gray-300 flex items-center h-full justify-center capitalize text-[10px] text-center sm:text-sm">not found</p>
        
        return seachedGovernorate.map((governorate, index) =>{
            return <div  key={index} 
                        onClick={() => {setSelectGovernorate(governorate); setOpenGovernomentList(false);
                                         setSearchDistrict(''); setSearchData((prev) => ({ ...prev, governorate: governorate})) }}
                        className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer">{governorate}</div>
            })
    }
} 




const districts = () => {
    const governorates = Object.keys(egyptData)
    const governorate: string | undefined = governorates.find((gov:string) =>   gov === searchGovernorate || gov === selectGoverorate )
    
    if(!governorate) return 
        <p className="text-gray-300 flex items-center h-full justify-center capitalize text-[10px] text-center sm:text-sm">not found, check the governorate field</p>
    
    const districts: string[] = egyptData[governorate]

    const districtExist = districts.find((d) => d.includes(searchDistrict))
    if(!districtExist && searchDistrict) 
        return <p className="text-gray-300 flex items-center h-full justify-center capitalize text-[10px] text-center sm:text-sm">not found, check the governorate field</p>
 
    if(!districtInputRef.current?.value)
    return districts.map((district, index) =>{
            return <div  key={index} 
                        onClick={() => {setSearchDistrict(district); setOpenDistrictList(false); 
                                        setSearchData((prev) => ({ ...prev, district: district}))}}
                        className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer">{district}</div>
            })
    else{

        const searchedDistricts = districts.filter((district) =>{
            return district.toLocaleLowerCase().includes(searchDistrict.toLocaleLowerCase())
        })

        return searchedDistricts.map((district,index) => 
            <div className="p-2 bg-gray-200 dark:bg-myBlack-800 my-1 cursor-pointer" 
                    key={index} onClick={() => { setSearchDistrict(district); setOpenDistrictList(false); 
                        setSearchData((prev) => ({ ...prev, district: district})) }}>{district}
            </div>
        )
        
    }
}

 
    const handleDistrictList = () =>{
        if(!governorateInputRef.current?.value){
            setOpenDistrictList(false)
        }
    }
    



if(location)
return (
    <div className={`flex  absolute bottom-[11%] w-[90%] sm:static gap-3 sm:gap-8 sm:w-full max-w-[650px]`}>

        {/* Governorate */}
        <motion.div className="w-1/2 relative space-y-4" ref={wrapperRef}
                initial={{x:-50, opacity:0}} animate={ location ? {x:0, opacity:1} : {x:-50, opacity:0}} 
                exit={{x:-50, opacity:0}}> 

            <input type="text" placeholder="Governorate" value={selectGoverorate || searchGovernorate } 
                    onChange={(e) => {setSearchGovernorate(e.target.value) ; setSelectGovernorate('') ;
                       setSearchData((prev) => ({ ...prev, governorate: e.target.value }))
                    } }
                    onFocus={() => setOpenGovernomentList(true)} ref={governorateInputRef}
                    className="w-full outline-none py-2 px-4 text-sm rounded-lg dark:bg-myBlack-900 border-[1.4px] dark:border-myBlack-700"  />

            <div 
                className={`${!openGovernomentList && 'invisible'}  h-[200px] overflow-y-scroll border-[1.4px] dark:border-myBlack-700 ESS pl-1`}
                >{governorates()}
            </div>
        </motion.div> 



        {/* Administrative District */}
        <motion.div className="w-1/2 space-y-4" ref={secWrapperRef} initial={{x:50, opacity:0}} animate={ location ? {x:0, opacity:1} : {x:50, opacity:0}}>
            
            <input type="text" placeholder="Administrative District"  value={searchDistrict}
                className="w-full outline-none py-2 px-4 text-sm rounded-lg dark:bg-myBlack-900 border-[1.4px] dark:border-myBlack-700"
                onChange={(e) => {setSearchDistrict(e.target.value); setSearchData((prev) => ({ ...prev, district: e.target.value })) }} 
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