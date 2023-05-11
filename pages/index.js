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

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/hello');
  const oldData = await res.json();

  return {
    props: { oldData },
  };
}

export default function BasicTable({oldData}) {

  const [data, setData] = useState(oldData);

  axios
    .get('http://localhost:3000/api/hello')
    .then((res) => {
      //console.log(data);
      setData(res.data);
    })
    .catch(err => console.log(err))
  
  //console.log(data)

  

  return (
    <Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <TableContainer sx={{maxWidth: 900, backgroundColor: "#ddd"}} component={Paper}>
        <Table sx={{ minWidth: 650, borderColor:"#111"}} aria-label="simple table">
          <TableHead >
            <TableRow sx={{ borderColor:"#111", '& td, & th': { borderBottom: '1px solid #323232' }}}>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '& td, & th': { borderBottom: '1px solid black' } }}
                
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  
    </Container>
      
  );
}
