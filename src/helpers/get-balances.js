import axios from 'axios';
import { commas } from 'number-prettier';
export const getBalances = async () => { 
    try{
        
        const response = await axios.get('https://shark-app-bo2p5.ondigitalocean.app/api/waceo/funds')
        if(response.status === 200){
            if(response.data.length){
                let dataArr = [ ["Fund", "Value"] ]
                for(let i of response.data[0].funds){
                    dataArr.push(i);
                } 
                console.log("----------------------------------------");
                console.log("WACEO FUNDS:", response.data[0]);
                return {
                    success: true, 
                    data: dataArr, 
                    total: commas(response.data[0].total_waceo_amount , 2)
                };;
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
