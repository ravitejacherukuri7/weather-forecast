import { FETCH_WEATHER_REQUEST, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE, ADD_WEATHER_DATA } from './weatherActions';

const initialState = {
    loading: false,
    weatherData: [],
    error: '',
    searchHistory: [],
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_WEATHER_SUCCESS:
            return {
                loading: false,
                weatherData: action.payload,
                error: '',
            };
        case FETCH_WEATHER_FAILURE:
            return {
                loading: false,
                weatherData: [],
                error: action.payload,
            };
        case ADD_WEATHER_DATA:
            return {
                ...state,
                searchHistory: [...state.searchHistory, action.payload],
            };
        default:
            return state;
    }
};

export default weatherReducer;