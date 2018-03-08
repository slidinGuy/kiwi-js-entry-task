import { call, put, take, takeLatest, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as api from '../api';

function* searchFlights(action) {
  try {
    let haveResults = true;
    let offset = 0
    while (haveResults) {
      const { payload, results } = yield call(
        api.searchFlights, action.from, action.to, action.date, offset);
      yield put({ type: "SEARCH_FLIGHTS_SUCCESS", payload });
      offset += 5;
      haveResults = offset < results;
      yield take('LOAD_MORE');
    }
    yield put({ type: "ALL_LOADED" });
  } catch (error) {
    yield put({ type: "SEARCH_FLIGHTS_FAILED", error });
  }
}

function* watchSearchFlights() {
  yield takeLatest("SEARCH_FLIGHTS", searchFlights);
}

function* searchLocations(action) {
  try {
    if (action.q.length < 2) {
      return;
    }
    yield call(delay, 500);
    const payload = yield call(api.searchLocations, action.q);
    yield put({ type: "SEARCH_LOCATIONS_SUCCESS", payload });
  } catch (error) {
    yield put({ type: "SEARCH_LOCATIONS_FAILURE", error });
  }
}

function* watchSearchLocations() {
  yield takeLatest("SEARCH_LOCATIONS", searchLocations);
}

export default function* rootSaga() {
  yield all([
    watchSearchFlights(),
    watchSearchLocations()
  ]);
}