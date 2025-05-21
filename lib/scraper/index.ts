import axios from 'axios';
import * as cheerio from 'cheerio'
import { extractPrice } from '../utils';
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
        const currentPrice=extractPrice(
            $('li.swatch-list-item-text inline-twister-swatch a-declarative desktop-twister-dim-row-0 span.a-list-item span#size_name_1 div.a-section dimension-slot-info span#_price span.olpWrapper a-size-small')
           
        ); // when we not sure about the price tag or we have many price tags
        console.log({title},currentPrice);

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