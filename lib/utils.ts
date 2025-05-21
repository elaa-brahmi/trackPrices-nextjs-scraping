/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractPrice(...elements:any){
    for(const element of elements){
        console.log("element ",element);
        const priceText=element.text().trim();
        console.log("priceText ",priceText);
        if(priceText){
            return priceText.replace(/[^0-9.]/g,'');
            //replace all caracters that are not  0-9 and .
        }
    }

}