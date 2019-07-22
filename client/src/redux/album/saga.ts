import {
  call, all, takeLatest, put,
} from 'redux-saga/effects';
import { FETCH_ALBUM_PHOTOS } from './action';
import { apiRequest } from 'helper/apiClient';

function* watchfetchAlbumPhoto() {
  const { response, error } = yield call(apiRequest, 'get', '/album', {});
  if (error) {
    console.log('>>>>>>with error', error);
    // yield call(handleError, FETCH_ALBUM_PHOTOS, error);
  } else if (response) {
    yield put({
      type: FETCH_ALBUM_PHOTOS.SUCCESS,
      result: {
        ...response,
      },
    });
  }
}

export default function* albumSaga() {
  yield all([
    takeLatest(FETCH_ALBUM_PHOTOS.REQUEST, watchfetchAlbumPhoto),
  ]);
}
