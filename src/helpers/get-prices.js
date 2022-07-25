import axios from 'axios';
import { format } from 'number-prettier';


export const getPrices = async () => { 
    try{
        
        const response = await axios.get('https://seahorse-app-vf5b4.ondigitalocean.app/api/waceo/prices'); 
        if(response.status === 200){
            if(response.data){
                console.log("----------------------------------------"); 
                console.log("WACEO PRICES:", response.data);
                return {
                  success: true,
                  waceoPriceInUsd: response.data.waceo_price_in_usd,
                  waceoPriceInEur: response.data.waceo_price_in_eur, 
                  waceoPriceInAvax: response.data.waceo_price_in_avax, 
                  waceoTotalSupply: format(response.data.waceo_total_supply, 2) 
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
