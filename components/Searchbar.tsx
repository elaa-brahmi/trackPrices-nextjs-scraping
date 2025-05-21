"use client" //beacuse we're using interactivity
import React, { FormEvent, useState } from 'react'
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
        return false;
    }
    return false;
}


const Searchbar = () => {
    const [searchPrompt,setSearchPrompt] =useState('');//This allows your component to remember values and re-render when they change.
    const [isLoading,setIsLoading]=useState(false);
    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const isValidLink=isValidAmazonProductURL(searchPrompt);
        alert(isValidLink? 'valid link' : 'invalid link');
        if(!isValidLink) return alert('please provide a valid amazon link');
        try{
            setIsLoading(true);
            //scrape the producrt page
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
        className="searchbar-input"
        ></input>
        <button 
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt===''}
        >
           {isLoading ? 'Searching...':'Search'}
        </button>

    </form>
  )
}

export default Searchbar