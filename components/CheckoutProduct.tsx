import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {selectBasketItems, selectBasketTotal} from '../Redux/basketSlice'
import Image from 'next/image'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter'
import {removeFromBasket} from '../Redux/basketSlice'
import toast from 'react-hot-toast'


interface Props {
    items: Product[];
    id: string
}





function CheckoutProduct({ id, items }: Props) {
    const dispatch = useDispatch()

    

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
        toast.error(`${items[0].title} removed from the basket`, {
        position: "bottom-center"
    })    

    }

  return (
      <div className=' flex flex-col gap-x-4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center'>
        
          <div className='relative h-44 w-44'>
              <Image
                  src={urlFor(items[0].image[0]).url()}
                  layout="fill"
                  objectFit='contain'
              />
          </div>
          <div className="flex flex-1 items-end lg:items-center">
              <div className="flex-1 space-y-4">
              
              <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
                 
                  <h4 className='font-semibold lg:w-96'>{items[0].title}  </h4>
                      <p className="flex items-end gap-x-1 font-semibold">{items.length}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      
                  </svg> 
                      </p>
               
                  </div>

                  
                

              <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                      show product details
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          
                      </svg>
                      

                  </p>
                  </div>

              <div className="flex flex-col items-end space-y-4">x
          
          <h4 className='text-xl font-semibold items-end text-blue-500 hover:underline'>
              
         
          <Currency
              quantity={items.reduce((total, item) => total + item.price, 0)}
          currency='USD'
              />
      
          </h4>

          <button onClick={removeItemFromBasket} className=" text-red-600 hover:underline" >Remove</button>
          </div>
      </div>
      </div>
  )
}

export default CheckoutProduct
