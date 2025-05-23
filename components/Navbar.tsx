import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const navIcons=[
    {src:"/assets/icons/search.svg", alt:"search"},
    {src:"/assets/icons/black-heart.svg", alt:"black-heart"},
    {src:"/assets/icons/user.svg", alt:"user"},
]
const Navbar = () => {
  return (
    <header className="w-full" >
       <nav className='flex justify-between items-center px-6 md:px-20 py-4'>
          
            <Link href="/" className="flex items-center gap-1">
                <Image src="/assets/icons/logo.svg"
                width={27}
                height={27}
                alt="logo"
                />
            <p className="font-spaceGrotesk text-[21px] text-secondary font-bold">
                Price<span className='text-red-500'>Wise</span>
            </p>
         </Link>

         <div className="flex items-center gap-5">
            {navIcons.map((icon) => (
                    <Image src={icon.src}
                    key={icon.alt}
                    width={28}  
                    height={28}
                    alt={icon.alt}
                    className="object-contain"
                    />
            ))}            

         </div>
       </nav>
    </header>
  )
}

export default Navbar