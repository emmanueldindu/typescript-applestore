import { Head } from 'next/document'
import React from 'react'
import Header from '../components/Header'
// import { selectBasketItems } from '../Redux/basketSlice'
import Currency from 'react-currency-formatter'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import CheckoutProduct from '../components/CheckoutProduct'
import {selectBasketItems, selectBasketTotal} from '../Redux/basketSlice'
import Stripe from 'stripe'
import { fetchPostJSON } from '../utils/api-helpers'
import getStripe from '../utils/get-stripejs'


function Checkout() {
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const router = useRouter()
  const [groupedItemsInBasket, setgroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
    
  )

  // const [loading, setloading] = useState(false)
  

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item)
      return results 
    }, {} as { [key: string]: Product[] }
    ) 
    setgroupedItemsInBasket(groupedItems)
  }, [items])

  const createCheckoutSession = async () => {
    // setloading(true) 

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_sessions",
      {
        items: items
      }
    )
    
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message)
      return
    }

    const stripe = await getStripe()
    
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id
    })

    console.warn(error.message)

    // setloading(false)
  }

  return (
      <div className='min-h-screen overflow-hidden bg-[#e7ecee]'>
          <Header />
 
          <main className='mx-auto max-w-5xl pb-24'>
            <div className="px-4 my-4 text-3xl font-semibold lg:text-4xl">
          <h1>{items.length > 0 ? 
            "Review your bag." : "your bag is empty"}
          </h1>
          {/* {
            items.length === 0 && (
           

            )
          }    */}

           
        
        </div>
        <p className="px-4">Free delivery and free returns.</p>

     

        {items.length > 0 && (
          <div className="mx-5 md:mx-8 ">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={ key} />
            ))}
            <div className='my-12 mt-6 ml-auto max-w-3xl'>
              <div className='divide-y divide-gray-300'>
                <div className='pb-4'>
                  <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p><Currency quantity={basketTotal} currency="USD" /></p>
                  </div>
                  <div className="flex justify-between">


                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between"></div>
                  <div className="flex flex-col gap-x-1 lg:flex-row">
                    Estimated tax for:{""}
                    <p className='flex cursor-pointer items-end text-blue-500 hover:underline'>
                      Enter zip code
                    </p>

                  </div>
                </div><p> $ -</p>
              </div>
            </div>
            <div className="flex justify-between pt-4 text-xl font-semibold">
              <h4>Total</h4>
              <h4><Currency quantity={basketTotal} currency="USD" /></h4>
            </div>
            
            <div className="my-14 space-y-4">
              <h4 className='text-xl font-semibold'>
                How would You like to check out?
              </h4>
              
              <div className='text-xl font-semibold'>
                <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                  <button className='ease  group py-7 px-5 z-30 w-auto'
                  // loading={loading}
                    onClick={createCheckoutSession}>
              
     
        <a href="/" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-md shadow-xl group hover:ring-1 hover:ring-purple-500">

          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>

                      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500  opacity-30 group-hover:rotate-90 ease">
                        
                      </span>
                      
                      <span className="relative text-white text-start button-text">
                        
                        Check Out


                      </span>
                      
     
                    </a>
                    

                  </button>
                <h1 className=''>
                  <span>Pay Monthly</span>
                  <span>with Apple card</span>
                  <span>
                    $283.16/mo. at 8% APR <sup className='-top-1'>0</sup>
                  </span>
                  </h1>

                  <button className='ease  group py-7 px-5 z-30 w-auto' onClick={()=> router.push("/")}>
        
     
        <a href="/" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-md shadow-xl group hover:ring-1 hover:ring-purple-500">

          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>

                      <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500  opacity-30 group-hover:rotate-90 ease">
                        
                      </span>
                      
                      <span className="relative text-white text-start button-text">
                        
                        Check Out With Apple Card


                      </span>
                      
     
                    </a>
                    

                  </button>
                  
        
                  
                  <p className="mt-2 max-w-[240px] text-[13px]">
                    0$.00 due today, which includes applicable full-price items, down payments, shipping, and taxes
                  </p>

              
                <div className="mb-4 flex flex-col texr-xl font-semibold">
                  Pay in full
                  <span>
                  <h4><Currency quantity={basketTotal} currency="USD" /></h4>


                    </span>
                  </div>
                  
                </div>
              </div> 
              
            </div>
            
          </div>

        )}
        <div className="relative ml-20">
        <button className='ease group py-7  z-30 w-auto' onClick={()=> router.push("/")}>
        
     
        <a href="/" className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-md shadow-xl group hover:ring-1 hover:ring-purple-500">

          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>

          <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500  opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white text-start button-text">continue shopping</span>
     
            </a>
            
          </button> 
          
        </div>
        

        
          </main>
      
    </div>
  )
}

export default Checkout
