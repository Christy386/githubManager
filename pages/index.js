import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';

export default function BasicTable() {
  const router = useRouter();

  const [data, setData] = useState({
    modifiedFiles: [],
    addedFiles: [],
    deletedFiles: [],
    commitBStatus: 'true',
    brench: 'dev'
  });
  const [checked, setChecked] = useState([0]);
  const [rowsLen, setRowsLen] = useState(0);

  function handleChange(checkedId, state){
    let newChecked = checked;
    newChecked[checkedId] = state;
    setChecked(newChecked);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get('/api/gitLocalState');
        //console.log(response.data);
        if(response.data.error.code == 128){
          router.push('/init');
        }        
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);

    
  }, []);
  

  return (
    <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <Box sx={{
        marginTop:'5px',
        marginBottom:'8px'
      }}>Brench: {data.brench}</Box>
      <TableContainer sx={{maxWidth: 900, backgroundColor: "#ddd"}} component={Paper}>
        <Table sx={{ minWidth: 650, borderColor:"#111"}} aria-label="simple table">
          <TableHead >
            <TableRow sx={{ borderColor:"#111", '& td, & th': { borderBottom: '1px solid #323232' }}}>     
              <TableCell>File name</TableCell>      
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.modifiedFiles.map((fileName) => (
              <TableRow
                sx={{ '& td, & th': { borderBottom: '1px solid black' } }}  
              >
                <TableCell component="th" scope="row">
                  {fileName}
                </TableCell>
                <TableCell align="right">Modified <DriveFileMoveIcon/></TableCell>
              </TableRow>
            ))}
          
            {data.addedFiles.map((fileName) => (
              <TableRow
                sx={{ '& td, & th': { borderBottom: '1px solid black' } }}  
              >
                <TableCell component="th" scope="row">
                  {fileName}
                </TableCell>
                <TableCell align="right">Added <CreateNewFolderIcon/></TableCell>
              </TableRow>
            ))}

            {data.deletedFiles.map((fileName) => (
              <TableRow
                sx={{ '& td, & th': { borderBottom: '1px solid black' } }}  
              >
                <TableCell component="th" scope="row">
                  {fileName}
                </TableCell>
                <TableCell align="right">Deleted Files <FolderDeleteIcon/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row" sx={{marginTop: '12px'}}>
        <Button variant="contained" onClick={()=>{}}>Test LabPronto Dev</Button>
        <Button variant="contained" onClick={()=>{}}>Test LabPronto Main</Button>
        <Button variant="contained" onClick={async () => {
            try {
              let response = await axios.get('/api/commitNPush2Dev');
              console.log(response.data)            
            } catch (error) {
              console.error(error);
            }
          }
        }>Commit & push to Dev</Button>
      </Stack>
    </Container>
      
  );
}
