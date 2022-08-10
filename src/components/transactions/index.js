import { useState, useEffect } from 'react'; 
import SearchIcon from '@mui/icons-material/Search'; 
import PerfectScrollbar from 'react-perfect-scrollbar';  
import MenuItem from '@mui/material/MenuItem'; 
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead, 
  TableRow,  
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField, 
  InputAdornment, 
  SvgIcon,
  Link,
  IconButton,
  Snackbar, 
  Alert
} from '@mui/material';     


export const Transfers = (props) => { 
 
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [transactions, setTransactions] = useState([]); 
  const [blockExplorer, setBlockExplorer] = useState([]); 

  useEffect(() => {
    fetchTransacitons(); 
  },[]);


  const fetchTransacitons = async () => {
    try{  
        const response = await props.getWaceoTransactions();
        setIsLoading(false);
        if(response.success){  
            setTransactions(response.transactions); 
            setBlockExplorer(response.explorer); 
        }else{ 
          setAlertMessage(response.message);
          setAlertSeverity("error");
        }  
    }catch(e){
      setAlertMessage(e.message);
      setAlertSeverity("error");
        console.log(e)
    }
}

  return (
    <Container maxWidth={false}>
    <Box {...props}>
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
            >
            <Typography  sx={{ m: 1, marginLeft:2 }} >
              Big Transfers {transactions.length ?  "(" +transactions.length+")" : ""}
            </Typography> 
        </Box> 
    </Box>
    <Box sx={{ mt: 3 }}>
    <Card > 
        <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>
                    Txn Hash
                    </TableCell>
                    <TableCell>
                    Method
                    </TableCell>
                    <TableCell>
                    Block
                    </TableCell>
                    <TableCell>
                    Date
                    </TableCell>
                    <TableCell  >
                    From
                    </TableCell> 
                    <TableCell>
                    To
                    </TableCell> 
                    <TableCell>
                    Value
                    </TableCell>
                    <TableCell>
                    Token
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {transactions && transactions.map((txn) => (
                    <TableRow hover  key={txn.key}  > 
                        <TableCell> 
                            <Link href={txn.txn_url} target="_blank">{txn.transaction_hash.slice(0,8)+"...."+txn.transaction_hash.slice(txn.transaction_hash.length-14,txn.transaction_hash.length)}</Link>
                        </TableCell>
                        <TableCell> 
                          {txn.method} 
                        </TableCell>
                        <TableCell> 
                            <Link href={`${blockExplorer}block/${txn.block_number}`} target="_blank"> {txn.block_number}</Link>
                        </TableCell>
                        <TableCell>
                            {txn.date}
                        </TableCell>
                          <TableCell> 
                            <Link href={txn.from_url} target="_blank">{txn.from_address.slice(0,8)+"...."+txn.from_address.slice(txn.from_address.length-6,txn.from_address.length)}</Link>
                        </TableCell> 
                        <TableCell> 
                            <Link href={txn.to_url} target="_blank">{txn.to_address.slice(0,8)+"...."+txn.to_address.slice(txn.to_address.length-6,txn.to_address.length)}</Link>
                        </TableCell>
                        <TableCell>
                            {txn.formattedValue}
                        </TableCell>
                        <TableCell> 
                            <Link href={txn.waceo_url} target="_blank"> WACEO (WACEO)</Link>
                        </TableCell>
                       
                    </TableRow>
                ))} 
                </TableBody>
            </Table>
            </Box>
        </PerfectScrollbar> 
        </Card>
    </Box> 

    <Snackbar 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right'  }}
      open={alertMessage.length} 
      autoHideDuration={8000}  
      onClose={() => setAlertMessage("") } 
      >
      <Alert severity={alertSeverity}  style={{marginBottom: 50,  width: 400}}>
          <strong>{alertMessage}</strong>  
      </Alert>
    </Snackbar>
 
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading} 
    >
        <CircularProgress color="primary" />
    </Backdrop>
  </Container>
  );
};
