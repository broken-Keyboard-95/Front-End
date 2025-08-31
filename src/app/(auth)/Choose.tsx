"use client"
import Link from 'next/link'
import {motion} from 'framer-motion'


interface cooseType {
    linkComponents: {text:string, href:string}[]
}


export default function Choose({linkComponents} : cooseType) {

    const Links = linkComponents.map((link:{text:string, href:string}, index:number) => {
        return <motion.li key={index} className='w-full' whileHover={{scaleX:1.1}}
                initial={{x:"-100%", opacity:0}} animate={{x:0, opacity:1}} 
                transition={{delay:index * .2 ,duration:.05, type:'spring', stiffness:150}}>

            <Link  href={link.href}
            className='block bg-myBlack-100 rounded-lg p-3 w-full border border-myBlack-700 text-center font-semibold text-xl
                shadow hover:shadow-md hover:shadow-myBlack-800 transition-shadow capitalize'>{link.text}</Link>
            </motion.li>
        
    })


    return (
        <ul className='h-screen flex flex-col items-center justify-center gap-4 w-full m-auto max-w-[600px]'>
            {Links}
        </ul>
    )
}
