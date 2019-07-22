import {
  call, all, takeLatest, put,
} from 'redux-saga/effects';
import { FETCH_PHOTO_DETAIL } from './action';
import { apiRequest } from 'helper/apiClient';

function* watchFetchPhotoDetail(data: GenericActionType) {
  const response = yield call(apiRequest, 'get', `/photos/${data.id}`, data);
  // const { response, error } = yield call(apiRequest, 'get', '/albums', {});

  if (response) {
    yield put({
      type: FETCH_PHOTO_DETAIL.SUCCESS,
      result: response,
    });
  }
  // if (error) {
  //   console.log('>>>>>>with error', error);
  //   // yield call(handleError, FETCH_PHOTO_DETAIL, error);
  // } else if (response) {
  //   yield put({
  //     type: FETCH_PHOTO_DETAIL.SUCCESS,
  //     result: response,
  //   });
  // }
}

export default function* photoDetailSaga() {
  yield all([
    takeLatest(FETCH_PHOTO_DETAIL.REQUEST, watchFetchPhotoDetail),
  ]);
}
