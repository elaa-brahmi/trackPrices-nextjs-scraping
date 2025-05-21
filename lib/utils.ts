/* eslint-disable @typescript-eslint/no-explicit-any *//* 
export function extractPrice(...elements:any){
    for(const element of elements){
      //  console.log("element ",element);
        const priceText=element.text().trim();
   //   console.log("priceText ",priceText);
        if(priceText){
            return priceText.replace(/[^\d.]/g, '');
            //replace all caracters that are not  0-9 and .
        }
    }

} */
// Extracts and returns the price from a list of possible elements.
import { PriceHistoryItem, Product } from "./types";
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if(priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, '');

      let firstPrice; 

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      } 

      return firstPrice || cleanPrice;
    }
  }

  return '';
}
export function extractCurrency(element:any){
    const currencyText=element.text().trim().slice(0,1);
    return currencyText?currencyText:'' ;

}
export function extractDescription(){}