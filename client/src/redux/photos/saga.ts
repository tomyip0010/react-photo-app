import {
  call, all, takeLatest, put, select,
} from 'redux-saga/effects';
import { FETCH_ALBUM_PHOTOS } from './action';
import { apiRequest } from 'helper/apiClient';

function* watchfetchAlbumPhoto(data: GenericActionType) {
  const { params } = data;
  if (isNaN(params.offset) || isNaN(params.limit)) {
    const filter = yield select((state: ReduxStoreType) => state.photos.filter);
    if (!params.offset) {
      params.offset = filter.offset;
    }
    if (!params.limit) {
      params.limit = filter.limit;
    }
  }
  const response = yield call(apiRequest, 'get', '/photos', data);
  // const { response, error } = yield call(apiRequest, 'get', '/albums', {});

  if (response) {
    yield put({
      type: FETCH_ALBUM_PHOTOS.SUCCESS,
      result: response,
    });
  }
  // if (error) {
  //   console.log('>>>>>>with error', error);
  //   // yield call(handleError, FETCH_ALBUM_PHOTOS, error);
  // } else if (response) {
  //   yield put({
  //     type: FETCH_ALBUM_PHOTOS.SUCCESS,
  //     result: response,
  //   });
  // }
}

export default function* albumSaga() {
  yield all([
    takeLatest(FETCH_ALBUM_PHOTOS.REQUEST, watchfetchAlbumPhoto),
  ]);
}
