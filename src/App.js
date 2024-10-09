import React from 'react';
import { Provider } from 'react-redux';
import WeatherComponent from './WeatherComponent';
import store from './redux/store';
import { CssBaseline } from '@mui/material';

function App() {
    return (
        <Provider store={store}>
            <CssBaseline />
            <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
                <WeatherComponent />
            </div>
        </Provider>
    );
}

export default App;