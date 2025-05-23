/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'
import Searchbar from '../../components/Searchbar'
import HeroCarousel from '../../components/HeroCarousel'
import "./globals.css";
import { getAllProducts } from '../../lib/actions/index'
import ProductCard from '../../components/ProductCard';

const home = async () => {
  const allProducts=await getAllProducts();

  return (
    <>
    <section className="px-6 md:px-20 py-24">

      <div className="flex max-xl:flex-col gap-16" >
        <div className="flex flex-col justify-center">
         
          <p className="flex gap-2 text-sm font-medium text-primary">
            smart shopping starts here:
            <Image src="/assets/icons/arrow-right.svg" 
            alt="pricewise"
             width={100} 
             height={100}
            className="w-20 h-20" />
          </p>
          <h1 className="mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900">
            Unleash the Power of<span className='text-primary'>PriceWise</span> 
          </h1>
          <p className="mt-6">
             Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
          </p>
          <Searchbar/>

        </div>
          <HeroCarousel/>
      </div>
    </section>
    <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
      <h2 className="text-secondary text-[32px] font-semibold">Trending</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-16">
     {    allProducts.map
        ((product) => (
         <ProductCard key={product._id} product={product}/>
        ))} 

      </div>

    </section>
    
    </>
  )
}

export default home