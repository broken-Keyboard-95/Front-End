"use client"

import { motion } from "framer-motion"


type PrompetMessageProps = {
  isSearch: boolean;
};



export default function PromptMessage({isSearch}:PrompetMessageProps) {
  const message = "What medicine are you looking for?".split("")

  if(isSearch === false) return (
        <h2 className="absolute sm:static top-1/2 -translate-y-1/2 text-lg sm:text-[20px] lg:text-[25px] italic 
                flex gap-[1px] sm:translate-y-[-15px]">
        
        {message.map((char, index) => (
            <motion.span key={index} initial={{ display: 'none'}} animate={{ display: 'inline'}}
                        transition={{ delay: index * 0.05,  duration: 0.2, }} >

            {char === " " ? "\u00A0" : char} {/* this "\u00A0" is bacuase space => ' ' */}
            </motion.span>
        ))}
        </h2>
    )
}



