import { call, put, takeEvery, delay } from "redux-saga/effects";
import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchTimeRequest,
  fetchTimeSuccess,
  fetchTimeFailure,
} from "../slices/externalDataSlice";
import { fetchWeather, fetchWorldTime } from "../../services/api";

function* fetchWeatherSaga() {
  try {
    yield delay(1000); // Simulate loading
    const weather = yield call(fetchWeather);
    yield put(fetchWeatherSuccess(weather));
  } catch (error) {
    yield put(fetchWeatherFailure(error.message));
  }
}

function* fetchTimeSaga() {
  try {
    yield delay(500);
    const time = yield call(fetchWorldTime);
    yield put(fetchTimeSuccess(time));
  } catch (error) {
    yield put(fetchTimeFailure(error.message));
  }
}

export default function* weatherSaga() {
  yield takeEvery(fetchWeatherRequest.type, fetchWeatherSaga);
  yield takeEvery(fetchTimeRequest.type, fetchTimeSaga);
}
