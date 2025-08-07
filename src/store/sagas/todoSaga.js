import { put, takeEvery, delay } from "redux-saga/effects";
import {
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
} from "../slices/todoSlice";

// Simulate API calls with delays
function* addTodoSaga(action) {
  try {
    // Simulate loading
    yield delay(800);

    const newTodo = {
      id: Date.now(),
      title: action.payload.title,
      description: action.payload.description || "",
      category: action.payload.category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

function* updateTodoSaga(action) {
  try {
    yield delay(500);
    yield put(updateTodoSuccess(action.payload));
  } catch (error) {
    yield put(updateTodoFailure(error.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    yield delay(300);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

export default function* todoSaga() {
  yield takeEvery(addTodoRequest.type, addTodoSaga);
  yield takeEvery(updateTodoRequest.type, updateTodoSaga);
  yield takeEvery(deleteTodoRequest.type, deleteTodoSaga);
}
