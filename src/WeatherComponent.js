import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, addWeatherData } from './redux/weatherActions';
import { Typography, TextField, Button, CircularProgress, Card, CardContent, Grid, CardActions } from '@mui/material';

const WeatherComponent = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const { loading, weatherData, error, searchHistory } = useSelector((state) => state);

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            dispatch(fetchWeatherData(city));
            dispatch(addWeatherData({ city, weatherData }));
            setCity(''); 
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <Typography variant="h4" gutterBottom>
                Weather Forecast
            </Typography>
            <form onSubmit={handleSearch}>
                <TextField
                    label="Enter city name"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Get Forecast
                </Button>
            </form>
            {loading && <CircularProgress style={{ margin: '20px 0' }} />}
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {searchHistory.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{item.city}</Typography>
                                {item.weatherData.map((weatherItem, idx) => (
                                    <div key={idx}>
                                        <Typography variant="body1">
                                            {new Date(weatherItem.dt * 1000).toLocaleDateString()}: {Math.round(weatherItem.main.temp)} °C, {weatherItem.weather[0].description}
                                        </Typography>
                                    </div>
                                ))}
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => alert("Feature to be implemented")}>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default WeatherComponent;