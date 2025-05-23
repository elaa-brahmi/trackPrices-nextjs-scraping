"use client"
import React from 'react'
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const heroImages=[
    {imgURL:'/assets/images/hero-1.svg', alt:'smartwatch'},
    {imgURL:'/assets/images/hero-2.svg', alt:'bag'},
    {imgURL:'/assets/images/hero-3.svg', alt:'lamp'},
    {imgURL:'/assets/images/hero-4.svg', alt:'air fryer'},
    {imgURL:'/assets/images/hero-5.svg', alt:'chair'}
]
const HeroCarousel = () => {
  return (
    <div className='relative sm:px-10 py-5 sm:pt-20 pb-5 max-w-[560px] h-[700px] w-full bg-[#F2F4F7] rounded-[30px] sm:mx-auto'>
        <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
        >
            {heroImages.map((image)=>(
                <Image
                src={image.imgURL}
                alt={image.alt}
                height={484}
                width={484}
                className="object-contain"
                key={image.alt}
                />

            ))}
        </Carousel>
        <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="hand drawn"
        height={175}
        width={175}
        className='max-xl:hiddent absolute -left-[15%] 
        bootom-0 z-0'
        />
    </div>
  )
}

export default HeroCarousel