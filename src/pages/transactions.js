import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material'; 
import { Transfers } from '../components/transactions/index';
import { DashboardLayout } from '../components/dashboard-layout';
import { getRequest, getAllowance} from '../helpers';
import {  getWaceoTransactions } from '../helpers' 


const Transactions = () => {


  return (
    <> 
      <div>
         <Head>
           <title>
             Transfers | WACEO
           </title>
         </Head>
         <Box
           component="main"
           sx={{
             flexGrow: 1,
             py: 4
           }}
         >  
          <Transfers  getWaceoTransactions={getWaceoTransactions}  /> 
         </Box>
       </div> 
    </>
  )  
};

Transactions.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Transactions;
