"use client"

import {motion} from 'framer-motion'

import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from 'react';


type PrompetMessageProps = {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  isSearch: boolean;
  setLocation: any
};

export default function Prompet({setIsSearch,isSearch, setLocation}:PrompetMessageProps) {


  return (
    <motion.div initial={{y:"1000px"}} animate={{y:'-15px'}} transition={{duration:.3,}}
          className={`border-[1.4px] flex gap-4 rounded-full overflow-hidden items-center w-full max-w-[330px] border-gray-300
             dark:border-myBlack-700 2vsm:max-w-[490px] vsm:max-w-[750px] 
              ${isSearch && `fixed bottom-2 w-[330px] 2vsm:w-[390px] vsm:w-[440px] sm:w-[640px] md:w-[750px]`}`} >

        <button className="ml-3 p-2 rounded-full text-lg hover:bg-gray-200 dark:hover:bg-myBlack-700"
                onClick={() => setLocation((prev: any) => !prev)}  ><FaLocationDot/></button>  

        <input type="text" 
                className="outline-none h-[55px] flex-grow dark:bg-transparent"/>

        <button onClick={() => setIsSearch(true)} className="px-6 h-[55px] bg-gray-200 dark:bg-myBlack-700" ><FaSearch/></button>  
    </motion.div>
  )
}



