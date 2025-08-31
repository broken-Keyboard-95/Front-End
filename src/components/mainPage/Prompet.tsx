"use client"

import {motion} from 'framer-motion'

import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from 'react';


// types

type PrompetMessageProps = {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch: boolean;
  setLocation: any;
  setSearchData: React.Dispatch<React.SetStateAction<{medicine: string, governorate: string, district: string} >>;
  checkData:any;
};


export default function 
    Prompet({setIsSearch,isSearch, setLocation, setSearchData,checkData}:PrompetMessageProps) {

    const prompetRef = useRef<any>(null)

    const giveData = (value:string) => setSearchData((prev) => ({...prev, medicine:value}))

    const onSearch = async () =>{
      setIsSearch(true);
      setLocation(false);

      const checkResult = await checkData()

      if(prompetRef.current && checkResult) {
          prompetRef.current.value = ''
          setSearchData((prev) => ({...prev, medicine:''}))
      }
      
    }

  return (
    <motion.div initial={{y:"1000px"}} 
      animate={{y:'-15px'}} transition={{duration:.3,}}
          className={`border-[1.4px] flex gap-4 rounded-full overflow-hidden items-center sm:w-full border-gray-300
              fixed bottom-4  dark:border-myBlack-700
              w-[330px] 2vsm:w-[390px] vsm:w-[440px] sm:max-w-[600px] md:max-w-[750px]
              `}
          >

        <button className="ml-3 p-2 rounded-full text-lg hover:bg-gray-200 dark:hover:bg-myBlack-700"
                onClick={() => setLocation((prev: any) => !prev)}  ><FaLocationDot/></button>  

        <input type="text" onChange={(e) => {giveData(e.target.value)} } 
                ref={prompetRef} 
                className="outline-none h-[55px] flex-grow dark:bg-transparent"/>

        <button onClick={() => onSearch()} 
            className="px-6 h-[55px] bg-gray-200 dark:bg-myBlack-700" ><FaSearch/></button>  
    </motion.div>
  )
}



