import Image from 'next/image'
import React from 'react'
import Iphone from './iphone.png'
import Button from './Button'

function Landing() {
  return (
      <section className='sticky top-0 mx-auto  flex h-screen max-w-[1350px] items-center
       justify-between px-8'>
          <div className="space-y-8  bg-[#E7ECEE]">
              <h1 className="space-y-3 text-4xl font-semibold tracking-wide lg:text-6xl xl:text-7xl ">
                  <span className='block bg-gradient-to-r from-pink-500 to-violet-500
                   bg-clip-text text-transparent'>
                      
                      Powered
                  </span>
                  <span className='block'>
                      By Intellect
                  </span>
                  <span className='block'>
                      Driven By Values
                      
                  </span>
              </h1>
              <div className="space-x-3 pt-5 space-y-[5px] mr-5 grid gap-4 md:flex lg:flex">
                  <Button  title=" Shop"/>
                  <a className='link'> Learn More </a>
              </div>
          
          </div>
          <div className=" relative  h-[400px] w-[450px] transition-all
              duration-500 md:block md:h-[400px] lg:block lg:h-[450px] lg:w-[400px]">
                  <Image src={Iphone} objectFit='contain' layout='fill' />
              </div>
    </section>
  )
}

export default Landing
