"use client"
import { motion } from 'framer-motion'


interface LabelInput {
    label: string,
    type: string,
    placeholder: string,
    name: string ,
    defaultValue?: string | undefined,
    error?: string | undefined,

}

export default function LabelInput({label, type, placeholder, defaultValue, error,name} : LabelInput) {

    const handleError = error ? error.charAt(0).toUpperCase() + error.slice(1)  : ''

    return(
        <label className="block space-y-2 flex-grow">
            {/* label text */}
            <p className="cursor-pointer capitalize">{label}</p>

            {/* input */}
            <input type={type} name={name} placeholder={placeholder} defaultValue={defaultValue}
                className="outline-none border border-gray-400 dark:border-myBlack-700 w-full py-[10px] px-4 rounded-lg
                    dark:bg-transparent hover:shadow-xl transition-shadow"
            />

            {error && <motion.p initial={{x:-50}} animate={{x:0}} transition={{type:"spring", stiffness:500}}
                className="text-red-600 text-sm">{handleError}</motion.p>}
        </label>
    )
}