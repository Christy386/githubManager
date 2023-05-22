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

  return (
    <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}>
      <Box sx={{
        width: '600px',
        height: '600px',
        backgroundColor: '#333',
        marginTop:'5px',
        marginBottom:'8px'
      }}>

      </Box>
      
    </Container>
      
  );
}
