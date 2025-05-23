/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use server"
import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import Product from '../models/product.model'
import { getLowestPrice,getHighestPrice,getAveragePrice } from '../utils'
import { User } from "../types";
import { generateEmailBody } from "../nodemailer";
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
        revalidatePath(`/products/${newProduct._id}`);//It makes sure the product page shows the most recent information after changes in the database.
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
// need more refinement
export async function getSimilarProducts(productId:string){
    try{
       connectToDB(); 
       const product=await Product.findById(productId);
       if(!product) return null;
       const similarProducts=Product.find({
        _id:{$ne:productId},

       }).limit(3);
       return similarProducts;
       
    }
     catch(error:any){
        throw new Error(` error fetching product by id ${error.message}`);
    }
}
export async function addUserEmailToProduct(productID:string,userEmail:string) {
    try{
        //send our first email
        connectToDB();
        const product=await Product.findById(productID);
        if(!product) return null;
        const userExists=product.users.some((user:User)=>user.email
        ===userEmail
        );
        if(!userExists){
           product.users.push({email:userEmail});
           await product.save();
           const emailContent=generateEmailBody(product,"WELCOME");

        }
        

    }
    catch(error){
        console.log(error);
        throw new Error(`error adding user email to product ${error}`);
    }
}