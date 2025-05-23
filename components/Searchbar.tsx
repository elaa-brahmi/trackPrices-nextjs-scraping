/* eslint-disable @typescript-eslint/no-unused-vars */
"use client" //beacuse we're using interactivity
import React, { FormEvent, useState } from 'react'
import { scrapeAndStoreProduct } from '../lib/actions';
const isValidAmazonProductURL=(url:string)=>{
    try{
        const parsedUrl=new URL(url);
        const hostname=parsedUrl.hostname;
        if(hostname.includes('amazon.com') ||
         hostname.includes('amazon.')||
          hostname.endsWith('amazon')){
            return true;
          }

    }
    catch(error) {
        console.log(error)
        return false;
    }
    return false;
}


const Searchbar = () => {
    const [searchPrompt,setSearchPrompt] =useState('');//This allows your component to remember values and re-render when they change.
    const [isLoading,setIsLoading]=useState(false);
    const handleSubmit= async (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const isValidLink=isValidAmazonProductURL(searchPrompt);
       // alert(isValidLink? 'valid link' : 'invalid link');
        if(!isValidLink) return alert('please provide a valid amazon link');
        try{
            setIsLoading(true);
            //scrape the producrt page
            const product =await scrapeAndStoreProduct(searchPrompt);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }


    
  return (
    <form className="flex flex-wrap gap-4 mt-12"
    onSubmit={handleSubmit}
    >
        <input 
        type="text"
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        placeholder="enter product link"
        className="flex-1 min-w-[200px] w-full p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
        ></input>
        <button 
        type="submit"
        className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
        disabled={searchPrompt===''}
        >
           {isLoading ? 'Searching...':'Search'}
        </button>

    </form>
  )
}

export default Searchbar