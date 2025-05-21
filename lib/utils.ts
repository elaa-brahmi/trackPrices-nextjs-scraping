/* eslint-disable @typescript-eslint/no-unused-vars */
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
export function extractDescription(element:any){
    
    

}
export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}
