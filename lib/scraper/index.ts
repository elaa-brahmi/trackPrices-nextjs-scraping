/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from '../utils';
import { Average } from 'next/font/google';
export async function scrapeAmazonProduct(url:string){
    if(!url) return;
    //bright data proxy configuration
    const username=String(process.env.BRIGHT_DATA_USERNAME);
    const password=String(process.env.BRIGHT_DATA_PASSWORD);
    const port=33335
    const session_id=(1000000*Math.random()) |0;

    const options={
        auth:{
            username:`${username}-session-${session_id}`,
            password,
        },
        host:'brd.superproxy.io',
        port,
        rejectUnauthorized:false
    }
    try{
        //fetching the product page
        const response= await axios.get(url,options);
        const $ =cheerio.load(response.data);
     //   console.log(response.data)
        //extract the product title
        const title=$('#productTitle').text().trim();//You (the developer) must know or inspect the HTML structure of the Amazon product page to find the correct selector for the product title.
       const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );
    const outOfStock=$('#availability span').text().trim().toLowerCase() === 'currently unavailable';
    const images = 
      $('#imgBlkFront').attr('data-a-dynamic-image') || 
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'
      const imageURLS=Object.keys(JSON.parse(images));
      const currency=extractCurrency($('.a-price-symbol')) //$ or euro or ...
      const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
      const description=extractDescription($); //we pass the enire $ because it's hard to parse the description
      //const description = extractDescription($)
   /*  console.log({title});
    console.log("currentPrice",currentPrice,originalPrice,outOfStock,imageURLS,currency);
    */ //construct data object with scraped information
    const data={
        url,
        currency:currency,
        image:imageURLS[0],
        title,
        currentPrice:Number(currentPrice) || Number(originalPrice) ,
        originalPrice:Number(originalPrice) || Number(currentPrice) ,
        priceHistory:[],
        discountRate:Number(discountRate),
        category:'category',
        reviewsCount:100,
        stars:4.5,
        description,
        lowestPrice:Number(currentPrice) || Number(originalPrice),
        highestPrice:Number(originalPrice)|| Number(currentPrice),
        averagePrice:Number(originalPrice)|| Number(currentPrice),
        isOutOfStock:outOfStock
    }
    console.log(data);
    return data;


    }
    catch(error: unknown){
        if (error instanceof Error) {
            console.log(error);
            throw new Error(`failed to scrape product:${error.message}`)
        } else {
            console.log(error);
            throw new Error('failed to scrape product: Unknown error');
        }
    }


}