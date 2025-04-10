import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './Qrcode.css'
import Button from '@mui/material/Button';

export default function BasicTextFields() {
  const[img, setImg] = useState("");
  const[loading, setLoading] = useState(false);
  const[qrdata, setQrData] = useState("");
  const[size, setSize] = useState('');
  async function generateQr(){
    setLoading(true);
    try{
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    }catch(error){
        console.error("Error while Generating image", error);
    } finally {
      setLoading(false);
    }
    }

 
  return ( 
    <>
    <div className='myBox'>

    {loading && <p className='loadData'>Please wait Loading...</p>}
    {img && <img src={img} alt="React Logo" />}

      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      >
      <Typography variant="body2" color="textSecondary">
        ENETR DATA FOR GENERATING QR.
      </Typography>
      <TextField value= {qrdata} onChange={(e) => setQrData(e.target.value)} id="outlined-basic" label="Qr Data" variant="outlined" />
      </Box>

      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      >
      <Typography variant="body2" color="textSecondary">
        ENETR SIZE OF YOUR QR-IMAGE
      </Typography>
      <TextField value={size}  onChange={(e) => setSize(e.target.value)} id="outlined-basic" label="SIZE" variant="outlined" />
      </Box>
    </div>
    <div className='myButtons'>
      <Button onClick={generateQr}  variant="contained" color="primary">
            GENERATE QR-CODE
        </Button><br></br>
        <Button variant="contained" color="success">
            DOWNLOAD QR-CODE
        </Button>
    </div>



    </>
   
  );
}
