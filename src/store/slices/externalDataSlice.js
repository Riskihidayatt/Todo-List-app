import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
  time: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

const externalDataSlice = createSlice({
  name: "externalData",
  initialState,
  reducers: {
    // Weather actions
    fetchWeatherRequest: (state) => {
      state.loading = true;
    },
    fetchWeatherSuccess: (state, action) => {
      state.weather = action.payload;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    },
    fetchWeatherFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Time actions
    fetchTimeRequest: (state) => {
      state.loading = true;
    },
    fetchTimeSuccess: (state, action) => {
      state.time = action.payload;
      state.loading = false;
    },
    fetchTimeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchTimeRequest,
  fetchTimeSuccess,
  fetchTimeFailure,
  clearError,
} = externalDataSlice.actions;

export default externalDataSlice.reducer;
