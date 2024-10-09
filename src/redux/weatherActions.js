import axios from 'axios';

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';
export const ADD_WEATHER_DATA = 'ADD_WEATHER_DATA';

const API_KEY = 'https://api.openweathermap.org/data/2.5/forecast?appid=15ca787f2d191cf1f09525804a2ce85d&q=kakinada'; 

export const fetchWeatherRequest = () => {
    return {
        type: FETCH_WEATHER_REQUEST,
    };
};

export const fetchWeatherSuccess = (data) => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        payload: data,
    };
};

export const fetchWeatherFailure = (error) => {
    return {
        type: FETCH_WEATHER_FAILURE,
        payload: error,
    };
};

export const addWeatherData = (data) => {
    return {
        type: ADD_WEATHER_DATA,
        payload: data,
    };
};

export const fetchWeatherData = (city) => {
    return async (dispatch) => {
        dispatch(fetchWeatherRequest());

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            const dailyData = response.data.list.filter((item, index) => index % 8 === 0);
            dispatch(fetchWeatherSuccess(dailyData));
        } catch (error) {
            dispatch(fetchWeatherFailure(error.response.data.message || error.message));
        }
    };
};