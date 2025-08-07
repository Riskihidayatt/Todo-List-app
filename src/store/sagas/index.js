import { all } from "redux-saga/effects";
import todoSaga from "./todoSaga";
import weatherSaga from "./weatherSaga";

export default function* rootSaga() {
  yield all([todoSaga(), weatherSaga()]);
}
