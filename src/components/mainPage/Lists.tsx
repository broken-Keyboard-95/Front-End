"use client"
import { useState, useEffect, useRef, memo} from "react";
import {motion} from 'framer-motion'
import { MdDelete } from "react-icons/md";

// tpye of "egyptData" 

type EgyptData = {
  [key: string]: string[];
};

interface ListsProps {
  location: boolean
  setSearchData: React.Dispatch<React.SetStateAction<{ medicine: string, governorate: string, district: string }>>
  egyptData:EgyptData,
}


// Governorates &&  Administrative Districts
export default function EgyptSelect({location, setSearchData, egyptData} : ListsProps){

    const allGovernorates = Object.keys(egyptData)

    const wrappeGovrRef = useRef<HTMLDivElement | null>(null)
    const wrapperDisRef = useRef<HTMLDivElement | null>(null)

    const [selectGov, setSelectGov] = useState('')
    const [selectDis, setSelectDis] = useState('')

    const [openGov, setOpenGov] = useState<boolean>(false)
    const [openDis, setOpenDis] = useState<boolean>(false)






     useEffect(() => {
        function handleClickOutside(event:any) {
            if (wrappeGovrRef.current && !wrappeGovrRef.current.contains(event.target)) {
                setOpenGov(false);
            }
            if (wrapperDisRef.current && !wrapperDisRef.current.contains(event.target)) {
                setOpenDis(false);
            }
        }

            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside); // clear envent
    }, []);


    
    const districts = egyptData[selectGov]
    

    const allDisEle = districts?.map((dis, index) => {
      return <li key={index} onClick={() => {setSelectDis(dis); setOpenDis(false);
                                            setSearchData(prev => ({...prev, district:dis})) }}
               className="cursor-pointer p-2 bg-gray-200 dark:bg-myBlack-800 rounded">{dis}</li>
      })


    const allGovEle = allGovernorates.map((gov, index) => {
      return <li key={index} onClick={() => {setSelectGov(gov); setOpenGov(false); setSelectDis('');
                                            setSearchData(prev => ({...prev, governorate:gov, district:''})) }}
               className="cursor-pointer p-2 bg-gray-200 dark:bg-myBlack-800 rounded">{gov}</li>
    } )



if(location) return (
        <div className={`flex  absolute bottom-[11%] w-[90%] sm:static gap-3 sm:gap-8 sm:w-full max-w-[650px]`}>

            <motion.div className="w-1/2 space-y-4"  ref={wrappeGovrRef}
                        initial={{x:-50, opacity:0}} animate={ location ? {x:0, opacity:1} : {x:-50, opacity:0}}>
                
                <div className="border py-2 px-4 w-full rounded-lg cursor-pointer  border-myBlack-700"
                      onClick={() => setOpenGov(prev => !prev)}>
                      {selectGov ? 
                          <div className="flex justify-between items-center"> <span >{selectGov}</span> 
                          <MdDelete className="translate-y-[1px]" 
                            onClick={() =>{ setSelectGov(''); setSelectDis('')}}/> </div>
                          :<span className="text-sm text-gray-400">Governorate</span>}   
                </div>
            

                <ul className={`${!openGov && 'invisible'} h-[200px] overflow-y-scroll ESS border border-myBlack-700 
                    p-[6px] rounded-lg space-y-1`}
                >{allGovEle}</ul>
            
            </motion.div >



            <motion.div className="w-1/2 space-y-4" ref={wrapperDisRef}
                        initial={{x:50, opacity:0}} animate={ location ? {x:0, opacity:1} : {x:50, opacity:0}}>
            
                  <div className="border py-2 px-4 w-full rounded-lg cursor-pointer  border-myBlack-700"
                        onClick={() => setOpenDis(prev => !prev)}> 
                        {selectDis? 
                          <div className="flex justify-between items-center"> <span >{selectDis}</span> 
                          <MdDelete className="translate-y-[1px]" onClick={() => setSelectDis('')}/> </div>
                          :<span className="text-sm text-gray-400">Districts</span>}
                      
                  </div>
              

                  <ul className={`${!openDis && 'invisible'} h-[200px] overflow-y-scroll ESS border border-myBlack-700 
                      p-[6px] rounded-lg space-y-1`}
                    >{allDisEle ? allDisEle :
                    <p className="text-sm flex  justify-center text-gray-400 items-center h-full">select governorate</p>}
                  </ul>
            
            </motion.div>

        </div>
    )
}






