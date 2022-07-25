 
import axios from 'axios';
import { commas } from 'number-prettier';


export const getTreasuryAssets = async () => { 
    try{
        
        function compare( a, b ) {
            if ( a[1] < b[1]){
            return 1;
            }
            if ( a[1] > b[1] ){
            return -1;
            }
            return 0;
        } 

        const response = await axios.get('https://seahorse-app-vf5b4.ondigitalocean.app/api/waceo/treasury'); 
        if(response.status === 200){
            if(response.data){
               
                console.log("----------------------------------------");
                console.log("WACEO TREASURY:", response.data);
                let dataArr =  response.data.tokens
                dataArr.unshift(["Fund", "Value"]);

               
                dataArr.sort( compare );

                return {
                    success: true, 
                    data: dataArr, 
                    total: commas(response.data.total_market_value, 2) };
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

