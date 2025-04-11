import * as React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';


export default function Weather() {
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState('Chennai');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [wind, setWind] = useState(0);
  const [hum, setHum] = useState(0);
  const [text, setText] = useState('Chennai');

  const apiKey = '7436f9c777b30511caa8e458eff59c57';

  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod === 200) {
        setTemp(data.main.temp);
        setCity(data.name);
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setWind(data.wind.speed);
        setHum(data.main.humidity);
      } else {
        alert('City not found!');
      }
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };
  useEffect(() => {
    search(); // default search for Chennai
  }, []);
 

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e0f7fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>

      <TextField
        label="Search City"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ width: '300px', mb: 4 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">

              <IconButton onClick={search}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Card sx={{ width: 350, p: 2, backgroundColor: '#ffffff', borderRadius: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <WbSunnyIcon sx={{ fontSize: 60, color: '#fdd835' }} />
          <Typography variant="h5" sx={{ mt: 1 }}>
            {city}
          </Typography>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {temp}°C
          </Typography>

          <Box sx={{ mt: 3, textAlign: 'left' }}>
            <Typography variant="body1">🌍 Latitude: {lat}</Typography>
            <Typography variant="body1">🌍 Longitude: {lon}</Typography>
            <Typography variant="body1">💨 Wind Speed: {wind} km/h</Typography>
            <Typography variant="body1">💧 Humidity: {hum}%</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
