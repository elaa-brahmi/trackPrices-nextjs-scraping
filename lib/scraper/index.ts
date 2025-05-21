import axios from 'axios';
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
        console.log(response.data)
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