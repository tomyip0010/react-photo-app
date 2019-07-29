import {
  call, all, takeLatest, put,
} from 'redux-saga/effects';
import { FETCH_PHOTO_DETAIL } from './action';
import { apiRequest } from 'helper/apiClient';

function* watchFetchPhotoDetail(data: GenericActionType) {
  const { response, error } = yield call(apiRequest, 'get', `/photos/${data.id}`, data);
  if (error) {
    yield put({
      type: FETCH_PHOTO_DETAIL.FAILURE,
      error,
    });
  } else {
    yield put({
      type: FETCH_PHOTO_DETAIL.SUCCESS,
      result: response,
    });
  }
}

export default function* photoDetailSaga() {
  yield all([
    takeLatest(FETCH_PHOTO_DETAIL.REQUEST, watchFetchPhotoDetail),
  ]);
}
