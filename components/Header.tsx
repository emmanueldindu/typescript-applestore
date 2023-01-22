import React from 'react'
import Image from 'next/image'
import Store from './store.png'
import Link from 'next/link'
import User from './user.png'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../Redux/basketSlice'

 

function Header() {
    
    const session = false
    const items = useSelector(selectBasketItems)

  

    return (

        <header className='sticky  top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4' >

            <div className="flex items-center justify-center md:w-1/5">

                <Link href='/'>
                    

                    <div className='relative h-10 w-5  cursor-pointer opacity-75 transition hover:opacity-100'>
                        
          
                        <Image src={Store} layout='fill' objectFit='contain' />
                        

                    </div>
                    
                </Link>
                
            </div>
            <div className="hidden  flex-1 items-center justify-center space-x-8 md:flex">

                <a className="headerLink">Product</a>
                <a className="headerLink">Explore</a>
                <a className="headerLink">Support</a> 
                <a className="headerLink">Business</a>

                </div>
                <div className="flex items-center justify-center gap-x-4 md:w-1/5 ">
                    

                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" className="w-6 h-6 headerLink">
                        <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    
                </svg>
                <div className="relative cursor-pointer">
                   
                   {items.length > 0 && (
                    <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs">
                        
                        {items.length}
                    
                    </span>
                        )}
                   <Link href='/checkout'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    

                    </Link>
               

                </div>
                {session ? (<Image src={User} alt=''
                width={34}
                height={34}
                className='cursor-pointer' />) : (
                    <Image src={User} width={30} height={30}  />
                 )}
            
            </div>
           
            
            </header >
               
  )
}

export default Header
