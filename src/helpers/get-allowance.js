 
import { ERC20 } from "../abi"; 
import { getAddresses } from "../constants"; 
import { format } from 'number-prettier'; 
import { ethers } from "ethers";    

export const getAllowance = async ( _tokenAddress, _lpAddress, _ownerAddress ) => { 
    try{
        const provider  = new ethers.providers.Web3Provider(window.ethereum) ; 
        const { chainId } = await provider.getNetwork(); 
        const addresses = getAddresses(chainId);
        if(addresses){   
                
            const tokenContract = new ethers.Contract( _tokenAddress, ERC20, provider); 
            const tokenName =  await tokenContract.name();
            const tokenSymbol =  await tokenContract.symbol();
            const decimals = await tokenContract.decimals();
            const totalSupply = await tokenContract.totalSupply();
            const formattedTotalSupply =  format( parseFloat(totalSupply.toString())/10**decimals, 2);
 
            let formatedResponse;
            if(_ownerAddress){
                const response = await tokenContract.allowance( _ownerAddress, addresses.Minter ); 
                formatedResponse = parseFloat(response.toString())/10**decimals; 
            };
           

            // GET avax price in USD
            const baseTokenContract = new ethers.Contract(addresses.Base, ERC20, provider);
            const stableTokenContract = new ethers.Contract(addresses.Stable, ERC20, provider); 
            const baseTokenDecimals = await baseTokenContract.decimals();
            const stableTokenDecimals = await stableTokenContract.decimals(); 
            const baseTokenAmont = await baseTokenContract.balanceOf(addresses.Base_Stable_LP);
            const stableTokenAmont = await stableTokenContract.balanceOf(addresses.Base_Stable_LP);
        
            const avaxPriceInUSD = (stableTokenAmont/(10**stableTokenDecimals))/(baseTokenAmont /(10**baseTokenDecimals));
            let tokenPriceInUSD = 0;
            let tokenValueInAvax = 0;
            // GET token value in AVAX

            if(_lpAddress){
                const tokenBalance =  await tokenContract.balanceOf(_lpAddress);
                const baseTokenBalance = await baseTokenContract.balanceOf(_lpAddress); 
                tokenValueInAvax =   (baseTokenBalance/(10**baseTokenDecimals))/(tokenBalance /(10**decimals));
                tokenPriceInUSD = parseFloat( parseFloat(tokenValueInAvax) * parseFloat(avaxPriceInUSD)).toFixed(2) 
            }else if(_tokenAddress.toLowerCase() == addresses.Base.toLowerCase()){
                tokenPriceInUSD = avaxPriceInUSD; 
            } 

            return {
                success: true, 
                value: formatedResponse, 
                name: tokenName, 
                symbol: tokenSymbol,
                supply: formattedTotalSupply,
                priceInUSD: tokenPriceInUSD 
            };
        }else{
            return{success: false, message: "Wrong Network!"}
        }
    }catch(e){
        console.log("e", e)
        return{success: false, message: e.message}
    }  
}
