 
 
import { getAddresses } from "../constants";   
import axios from "axios"; 

export const getWaceoTransactions = async () => {  
    try{
        
        const addresses = getAddresses(43113); 
        const response = await axios.get('https://seahorse-app-vf5b4.ondigitalocean.app/api/waceo/transactions'); 
        if(response.status === 200){
            if(response.data.length){
                console.log("----------------------------------------"); 
                console.log("WACEO TRANSACTIONS:", response.data);
                return {success: true, transactions: response.data, explorer: addresses.Block_Explorer };
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
