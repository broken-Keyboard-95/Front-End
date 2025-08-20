"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { FaRegQuestionCircle } from "react-icons/fa";
import {animate, motion} from 'framer-motion'

export default function MainNavbar() {

    const pathName = usePathname() 
    const headerRef = useRef <HTMLElement | null>(null)

    useEffect(() =>{

        const checkScroll = () =>{
            if(window.scrollY > 0) return headerRef.current?.classList.add('border-gray-200')
            else return headerRef.current?.classList.remove('border-gray-200')
        }

        window.addEventListener('scroll', checkScroll)
        return () => window.removeEventListener('scroll', checkScroll)

    }, [])

    const linkComponents = [
        {text:'login', href:"/logsin", backSuccess:false, styles:'bg-black dark:bg-white dark:text-black text-white hover:opacity-80'},
        {text:'sign up', href:"/signsup", backSuccess:false, styles:`${pathName == '/' && 'hidden'} sm:block bg-white border border-gray-300 hover:bg-gray-200 dark:text-white dark:bg-black dark:border-gray-500 border-[1.5px] dark:hover:bg-myBlack-700`},
    ]


    const links = linkComponents.map((link, index) =>{
        if(pathName === link.href || link.backSuccess) return null

        return  <Link key={index} href={link.href}  
                    className={`${link.styles} font-medium py-[6px] px-4 border rounded-full transition-colors`}> {link.text}
                </Link> 
    })



    return (
        <motion.header ref={headerRef} initial={{y:"-100%"}} animate={{y:0}}
                className="text-stone-900 bg-white dark:bg-myBlack-900 fixed top-0 w-full border-b border-transparent" >

            <nav className="2xl:container px-4 flex items-center justify-between py-3 ">
                <Link href='/' className="text-2xl italic dark:text-white"><motion.span>MediFind</motion.span></Link>

                <ul className="flex gap-4 ">
                    {links}
                    <Link href="/__" className="flex items-center text-xl p-2 hover:bg-gray-200 rounded-full dark:text-white dark:hover:bg-myBlack-700"><FaRegQuestionCircle/></Link>
                </ul>
            </nav>
        </motion.header>
    )
}
