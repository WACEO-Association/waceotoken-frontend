 
// import { ERC20 } from "../abi"; 
// import { getAddresses } from "../constants"; 
// import   Networks  from "../constants/networks";
// import { ethers } from "ethers";    
// import { commas } from 'number-prettier';

// export const getTreasuryAssets = async ( Web3Api) => { 
//     try{

     
//         const provider  = new ethers.providers.Web3Provider(window.ethereum) ; 
//         const { chainId } = await provider.getNetwork(); 
//         const addresses = getAddresses(chainId);
    
//         if(addresses){   

//             const supportedTokensArray = addresses.Supported_Tokens;
//             let responseArr = [ ["Fund", "Value"] ];
//             let total = 0;

//             const baseTokenContract = new ethers.Contract(addresses.Base, ERC20, provider);
//             const stableTokenContract = new ethers.Contract(addresses.Stable, ERC20, provider);

//             const baseTokenDecimals = await baseTokenContract.decimals();
//             const baseTokenSymbol = await baseTokenContract.symbol();
//             const stableTokenDecimals = await stableTokenContract.decimals();

//             const baseTokenAmont = await baseTokenContract.balanceOf(addresses.Base_Stable_LP);
//             const stableTokenAmont = await stableTokenContract.balanceOf(addresses.Base_Stable_LP);

//             const baseTokenPriceInUSD = (stableTokenAmont/(10**stableTokenDecimals))/(baseTokenAmont /(10**baseTokenDecimals));
            
//             for(let i of supportedTokensArray){
//                 const tokenContract = new ethers.Contract( i.tokenAddress, ERC20, provider);  

//                 const decimals = await tokenContract.decimals();
//                 const symbol =  await tokenContract.symbol();

//                 let balance = await tokenContract.balanceOf(addresses.Treasury);
//                 let _baseAmount =  await baseTokenContract.balanceOf(i.lpAddress);
//                 let _tokenAmount = await tokenContract.balanceOf(i.lpAddress);
//                 console.log("symbol:", symbol)
//                 console.log("balance:", balance)
//                 console.log("_baseAmount:", _baseAmount)
//                 console.log("_tokenAmount:", _tokenAmount)
//                 console.log("--------------------------------")
//                 if( 
//                     parseFloat(_baseAmount.toString()) > 0 && 
//                     parseFloat(_tokenAmount.toString()) > 0 &&
//                     parseFloat(balance.toString()) > 0 
//                 ){ 
//                     const formattedBalance = parseFloat(balance.toString())/(10**decimals);
//                     const formattedBaseAmount = parseFloat(_baseAmount.toString())/(10**baseTokenDecimals);
//                     const formattedTokenAmount = parseFloat(_tokenAmount.toString())/(10**decimals);
                    
//                     const tokenValueInAvax = formattedBaseAmount/formattedTokenAmount;
//                     const tokenPriceInUSD = parseFloat(tokenValueInAvax*baseTokenPriceInUSD).toFixed(6);
//                     const marketValueOfTokenBalance = formattedBalance*tokenPriceInUSD;
//                     total = total + marketValueOfTokenBalance;
    
//                     let baseFundName = `${symbol} - ${commas(parseInt(marketValueOfTokenBalance),2)} $`
//                     responseArr.push([baseFundName,parseInt(marketValueOfTokenBalance) ])
//                 } 
//             } 
//             const baseTokenBalance = await baseTokenContract.balanceOf(addresses.Treasury);
//             const formattedBaseTokenBalance = parseFloat(baseTokenBalance.toString())/(10**baseTokenDecimals);
//             const baseTokenMarketValue = formattedBaseTokenBalance*baseTokenPriceInUSD;
//             total = total + baseTokenMarketValue;
//             let baseFundName = `${baseTokenSymbol} - ${commas(parseInt(baseTokenMarketValue),2)} $`
//             responseArr.push([baseFundName, parseInt(baseTokenMarketValue)]);

//             const formattedTotal = commas(parseInt(total), 2);

//             return {success: true, data: responseArr, total: formattedTotal };
//         }else{
//             return{success: false, message: "Wrong Network!"}
//         }
//     }catch(e){
//         console.log("e", e)
//         return{success: false, message: e.message}
//     }  
// }


 
// import { ERC20 } from "../abi"; 
// import { getAddresses } from "../constants"; 
// import   Networks  from "../constants/networks";
// import { ethers } from "ethers";    
// import { commas } from 'number-prettier';

// export const getTreasuryAssets = async ( Web3Api) => { 
//     try{

     
      
//         const _addresses = getAddresses(43113);
    
//         if(_addresses){   

//             const supportedTokensArray = _addresses.Supported_Tokens;
//             let responseArr = [ ["Fund", "Value"] ];
//             let total = 0;


//             // // Get stable and base tokens data
//             // const tokensArrayMetadata = await Web3Api.token.getTokenMetadata({
//             //     chain: _addresses.ChainId_Hex,
//             //     addresses: [
//             //         _addresses.Stable,
//             //         _addresses.Base 
//             //     ],
//             // });

//             // // Set decimals
//             // const stableTokenDecimals = parseFloat(tokensArrayMetadata[0].decimals);
//             // const baseTokenDecimals = parseFloat(tokensArrayMetadata[1].decimals); 
//             // const baseTokenSymbol = parseFloat(tokensArrayMetadata[1].symbol); 
//             // let baseTokenAmont = null;
//             // let stableTokenAmont =  null;
             
  
//             // // Get token balances of LP address
//             // const balances = await Web3Api.account.getTokenBalances({
//             //   chain: _addresses.ChainId_Hex,
//             //   address: _addresses.Base_Stable_LP 
//             // });
           
//             // // Set token balances of LP address
//             // for(let i of balances){
//             //   if(i.token_address.toLowerCase() == _addresses.Stable.toLowerCase()){ 
//             //     stableTokenAmont = parseFloat(i.balance);
//             //   }else  if(i.token_address.toLowerCase() == _addresses.Base.toLowerCase()){
//             //     baseTokenAmont = parseFloat(i.balance);
//             //   }
//             // }
           
//             // if(baseTokenAmont && stableTokenAmont){ 
             
//             //   const formattedBaseTokenAmount = parseFloat( baseTokenAmont)/ ( 10**parseFloat(baseTokenDecimals));
//             //   const formattedStableTokenAmount = parseFloat(stableTokenAmont)/ (10**parseFloat(stableTokenDecimals));
   
//             //   const baseTokenPriceInUSD = formattedStableTokenAmount/formattedBaseTokenAmount; 
//             //     console.log("treas baseTokenPriceInUSD", baseTokenPriceInUSD)
             
//             // }else{
//             //   return null;
//             // }


//             // const treasuryAssets = await Web3Api.account.getTokenBalances({
//             //     chain: _addresses.ChainId_Hex,
//             //     address: _addresses.Treasury 
//             // });
             
//             // for(let i of treasuryAssets){ 
//             //     let isSupported = false;
//             //     let tokenObj = null;

//             //     for(let b of supportedTokensArray){
//             //        if(i.token_address.toLowerCase() == b.tokenAddress.toLowerCase()){
//             //          isSupported = true;
//             //          tokenObj = b;
//             //        }
//             //     }
//             //     if(isSupported){
//             //         const decimals =  i.decimals;
//             //         const symbol =  i.symbol;
//             //         const balance = i.balance;

//             //         const lpAssets = await Web3Api.account.getTokenBalances({
//             //             chain: _addresses.ChainId_Hex,
//             //             address: i.lpAddress
//             //         });


//             //         let _baseAmount = 0;
//             //         let _tokenAmount = 0;
//             //         for(let c of lpAssets){
//             //             if(c.token_address.toLowerCase() == _addresses.Base.toLowerCase()){
//             //                 _baseAmount = c.balance;
//             //             }else if(c.token_address.toLowerCase() == i.token_address.toLowerCase()){
//             //                 _tokenAmount = c.balance;
//             //             }
//             //         }

//             //         if( 
//             //             parseFloat(_baseAmount.toString()) > 0 && 
//             //             parseFloat(_tokenAmount.toString()) > 0 &&
//             //             parseFloat(balance.toString()) > 0 
//             //         ){ 
//             //             const formattedBalance = parseFloat(balance.toString())/(10**decimals);
//             //             const formattedBaseAmount = parseFloat(_baseAmount.toString())/(10**baseTokenDecimals);
//             //             const formattedTokenAmount = parseFloat(_tokenAmount.toString())/(10**decimals);
                        
//             //             const tokenValueInAvax = formattedBaseAmount/formattedTokenAmount;
//             //             const tokenPriceInUSD = parseFloat(tokenValueInAvax*baseTokenPriceInUSD).toFixed(6);
//             //             const marketValueOfTokenBalance = formattedBalance*tokenPriceInUSD;
//             //             total = total + marketValueOfTokenBalance;
        
//             //             let baseFundName = `${symbol} - ${commas(parseInt(marketValueOfTokenBalance),2)} $`
//             //             responseArr.push([baseFundName,parseInt(marketValueOfTokenBalance) ])
//             //         } 
//             //     }else if(i.token_address.toLowerCase() == _addresses.Base.toLowerCase()){
//             //         const baseTokenBalance = i.balance;
//             //         const formattedBaseTokenBalance = parseFloat(baseTokenBalance.toString())/(10**baseTokenDecimals);
//             //         const baseTokenMarketValue = formattedBaseTokenBalance*baseTokenPriceInUSD;
//             //         total = total + baseTokenMarketValue;
//             //         let baseFundName = `${baseTokenSymbol} - ${commas(parseInt(baseTokenMarketValue),2)} $`
//             //         responseArr.push([baseFundName, parseInt(baseTokenMarketValue)]);
//             //     }
//             // } 

//             const formattedTotal = commas(parseInt(total), 2); 
//             return {success: true, data: responseArr, total: formattedTotal };
//         }else{
//             return{success: false, message: "Wrong Network!"}
//         }
//     }catch(e){
//         console.log("e", e)
//         return{success: false, message: e.message}
//     }  
// }
