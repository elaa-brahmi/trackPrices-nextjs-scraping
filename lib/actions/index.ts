/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use server"
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import Product from '../models/product.model'
import { getLowestPrice,getHighestPrice,getAveragePrice } from '../utils'
export async function scrapeAndStoreProduct(productUrl:string){
    if(!productUrl) return;
    try{
        connectToDB();
        const scrapedProduct=await scrapeAmazonProduct(productUrl); //parsing the product
       // if(!scrapedProduct) return;
        //get all products that the user inputs in our application 
        // and store them and then periodically check for the changes
        //in the price by scraping them so we can send automatic email alert as soon as the price drop
        if (!scrapedProduct || !scrapedProduct.url ) {
            throw new Error("Missing required product fields");
        }
        let product=scrapedProduct;
        const existinProduct=await Product.findOne({
            url:scrapedProduct?.url
        });
        if(existinProduct){
            console.log("product exist already");
            //update price history
            const updatedPriceHistory:any=[
                ...existinProduct.priceHistory,
                {price:scrapedProduct?.currentPrice}
            ];//the price history is updated to include the most recent price, preserving all previous prices
            product={
                ...scrapedProduct,//// copies all properties from the latest scraped product
                priceHistory:updatedPriceHistory,
                lowestPrice:getLowestPrice(updatedPriceHistory),
                highestPrice:getHighestPrice(updatedPriceHistory),
                averagePrice:getAveragePrice(updatedPriceHistory)
            }
        }
        const newProduct=await Product.findOneAndUpdate(
            {url:scrapedProduct?.url} ,
            product,
            {upsert:true,new:true} //if it does not exist it will create one in the database
        )
        //revalidatePath(`/products/${newProduct._id}`);
    }
    catch(error:any){
        throw new Error(`failed to create/update product :${error.message}`)
    }
}
export async function getProductById(productId:string){
    //connect to db
    try{
        connectToDB();
        const product=Product.findOne({
            _id:productId
        });
        if(!product) return null;
        return product;

    }
    catch(error:any){
        throw new Error(` error fetching product by id ${error.message}`);
    }
}
export async function getAllProducts(){
    try{
       connectToDB(); 
       const products=Product.find();
       return products
    }
     catch(error:any){
        throw new Error(` error fetching product by id ${error.message}`);
    }
}