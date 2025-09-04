"use client"
import { useActionState } from 'react'
import { login } from '../../../actions/auth/login'

import Input from '../LabelInput'


export default function LogIn() {

  const [state, action, isPending] = useActionState(login , undefined)


  return (
    <div className='bg-gray-100 dark:bg-myBlack-900 px-3 sm:px-8 flex items-center justify-center min-h-screen'>  
        <div className='border-[1.5px] bg-white dark:bg-myBlack-900 dark:border dark:border-myBlack-700 px-4 py-6 shadow-xl rounded-xl space-y-8  w-full max-w-[600px]'>
            <p className="text-center text-4xl capitalize font-Merienda">login</p>
             
            <form action={action} className='flex flex-col gap-4'>
                  <Input label="email" type='text' placeholder='yourname@example.com' name={'email'}/>
                  <Input label="password" type='password' placeholder='**********' name={'password'}/>

                  <button type='submit' 
                      className='p-[10px] dark:bg-gradient-to-r from-[#333] via-[#3b3b3b] to-[#333] dark:hover:from-[#3b3b3b] dark:hover:via-[#424242] dark:hover:to-[#3b3b3b]
                       mt-2  font-semibold w-full rounded-lg bg-black text-white hover:bg-myBlack-700'>
                        {isPending ? "login...": "login"}
                  </button>
            </form>
        </div>
    </div>
  )
}


