/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use server"

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl:string){
    if(!productUrl) return;
    try{
        connectToDB();
        const scrapedProduct=await scrapeAmazonProduct(productUrl);
       // if(!scrapedProduct) return;
        //get all products that the user inputs in our application 
        // and store them and then periodically check for the changes
        //in the price by scraping them so we can send automatic email alert as soon as the price drop
    }
    catch(error:any){
        throw new Error(`failed to create/update product :${error.message}`)
    }
}