
 
// import {WaceoContract, MinterContract, ERC20 } from "../abi"; 
// import { getAddresses } from "../constants" 
// import { ethers } from "ethers"; 
// import { format } from 'number-prettier';


// export const getPrices = async () => { 
//     try{
//         const provider  = new ethers.providers.Web3Provider(window.ethereum) ; 
//         const { chainId } = await provider.getNetwork(); 
//         const addresses = getAddresses(chainId);
//         if(addresses){ 
//             const waceoContract = new ethers.Contract(addresses.Waceo, WaceoContract, provider);
//             const minterContract = new ethers.Contract(addresses.Minter, MinterContract, provider);
           
//             const totalSupply = await waceoContract.totalSupply();
//             const formatedTotalSupply = format(totalSupply/(10**9), 2);
           
//             const waceoPriceInAvax = await minterContract.waceoValueInBaseToken();
//             const formatedWaceoPriceInAvax = waceoPriceInAvax/(10**9);
           
           
//             const baseTokenContract = new ethers.Contract(addresses.Base, ERC20, provider);
//             const stableTokenContract = new ethers.Contract(addresses.Stable, ERC20, provider);
            
//             const baseTokenDecimals = await baseTokenContract.decimals();
//             const stableTokenDecimals = await stableTokenContract.decimals();
        
//             const baseTokenAmont = await baseTokenContract.balanceOf(addresses.Base_Stable_LP);
//             const stableTokenAmont = await stableTokenContract.balanceOf(addresses.Base_Stable_LP);
        
//             const avaxPriceInUSD = (stableTokenAmont/(10**stableTokenDecimals))/(baseTokenAmont /(10**baseTokenDecimals));
//             const waceoPriceInUSD =  avaxPriceInUSD*formatedWaceoPriceInAvax; 
//             const formatedWaceoPriceInUSD =  waceoPriceInUSD.toFixed(4);
//             const indicator = addresses.EUR_USD_Indicator;
//             const waceoPriceInEUR = parseFloat(waceoPriceInUSD)*parseFloat(indicator);
//             const formatedWaceoPriceInEUR = waceoPriceInEUR.toFixed(4);
          
//             const prices = {
//                 waceoPriceInUsd: formatedWaceoPriceInUSD,
//                 waceoPriceInEur: formatedWaceoPriceInEUR,
//                 waceoPriceInAvax: formatedWaceoPriceInAvax,
//                 waceoTotalSupply: formatedTotalSupply
//             }
          
//             return prices;
//         }else{
//             return null;
//         }
       
//     }catch(e){
//         console.log(e)
//     } 
// }



 
// import {WaceoContract, MinterContract, ERC20 } from "../abi"; 
// import { getAddresses } from "../constants" 
// import { ethers } from "ethers"; 
// import { format } from 'number-prettier';
 

// export const getPrices = async ( Web3Api) => { 
//     try{
       
//           const _addresses = getAddresses(43113); 

//           // Get total supply of WACEO token
//           const totalSupply = await Web3Api.native.runContractFunction({
//             chain: _addresses.ChainId_Hex,
//             address: _addresses.Waceo,
//             function_name: "totalSupply",
//             abi: WaceoContract,
//             params: {},
//           }); 
           
//           // Get waceo price in avax from Minter contract
//           const waceoPriceInAvax = await Web3Api.native.runContractFunction({
//             chain: _addresses.ChainId_Hex,
//             address: _addresses.Minter,
//             function_name: "waceoValueInBaseToken",
//             abi: MinterContract,
//             params: {},
//           });  
        
//           // Get stable and base tokens data
//           const tokensArrayMetadata = await Web3Api.token.getTokenMetadata({
//             chain: _addresses.ChainId_Hex,
//             addresses: [
//                 _addresses.Stable,
//                 _addresses.Base 
//             ],
//           });
        
//           // Set decimals
//           const stableTokenDecimals = parseFloat(tokensArrayMetadata[0].decimals);
//           const baseTokenDecimals = parseFloat(tokensArrayMetadata[1].decimals); 
//           let baseTokenAmont = null;
//           let stableTokenAmont =  null;
           

//           // Get token balances of LP address
//           const balances = await Web3Api.account.getTokenBalances({
//             chain: _addresses.ChainId_Hex,
//             address: _addresses.Base_Stable_LP 
//           });
         
//           // Set token balances of LP address
//           for(let i of balances){
//             if(i.token_address.toLowerCase() == _addresses.Stable.toLowerCase()){ 
//               stableTokenAmont = parseFloat(i.balance);
//             }else  if(i.token_address.toLowerCase() == _addresses.Base.toLowerCase()){
//               baseTokenAmont = parseFloat(i.balance);
//             }
//           }
         
//           if(baseTokenAmont && stableTokenAmont){ 
//             // Calculate prices
//             const formatedTotalSupply = format(parseFloat(totalSupply)/(10**9), 2); 
//             const formatedWaceoPriceInAvax = parseFloat(waceoPriceInAvax)/(10**9);
            
//             const formattedBaseTokenAmount = parseFloat( baseTokenAmont)/ ( 10**parseFloat(baseTokenDecimals));
//             const formattedStableTokenAmount = parseFloat(stableTokenAmont)/ (10**parseFloat(stableTokenDecimals));
 
//             const avaxPriceInUSD = formattedStableTokenAmount/formattedBaseTokenAmount; 
//             const waceoPriceInUSD =  avaxPriceInUSD*formatedWaceoPriceInAvax; 
//             const formatedWaceoPriceInUSD =  waceoPriceInUSD.toFixed(4);
//             const indicator = _addresses.EUR_USD_Indicator;
//             const waceoPriceInEUR = parseFloat(waceoPriceInUSD)*parseFloat(indicator);
//             const formatedWaceoPriceInEUR = waceoPriceInEUR.toFixed(4);
          
//             const prices = {
//                 waceoPriceInUsd: formatedWaceoPriceInUSD,
//                 waceoPriceInEur: formatedWaceoPriceInEUR,
//                 waceoPriceInAvax: formatedWaceoPriceInAvax,
//                 waceoTotalSupply: formatedTotalSupply
//             }
          
//             return prices;
        
//           }else{
//             return null;
//           }
       
//     }catch(e){
//         console.log(e)
//     } 
// }

