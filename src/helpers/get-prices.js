import axios from 'axios';
import { format } from 'number-prettier';


export const getPrices = async () => { 
    try{
        
        const response = await axios.get('https://shark-app-bo2p5.ondigitalocean.app/api/waceo/prices')
        if(response.status === 200){
            if(response.data.length){
                console.log("----------------------------------------"); 
                console.log("WACEO PRICES:", response.data[0]);
                return {
                  success: true,
                  waceoPriceInUsd: response.data[0].waceo_price_in_usd,
                  waceoPriceInEur: response.data[0].waceo_price_in_eur, 
                  waceoPriceInAvax: response.data[0].waceo_price_in_avax, 
                  waceoTotalSupply: format(response.data[0].waceo_total_supply, 2) 
                }
            }else{
                return{success: false, message: "Something went wrong!"};
            }
        }else{
          return{success: false, message: "API Error"};
        }
       
           
    }catch(e){
        console.log("e", e)
        return{success: false, message: e.message}
    }  
}
