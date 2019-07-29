import {
  call, all, takeLatest, put, select,
} from 'redux-saga/effects';
import { FETCH_ALBUM_LIST } from './action';
import { apiRequest } from 'helper/apiClient';

function* watchfetchAlbumPhoto(data: GenericActionType) {
  const { params } = data;
  if (isNaN(params.offset) || isNaN(params.limit)) {
    const filter = yield select((state: ReduxStoreType) => state.albums.filter);
    if (!params.offset) {
      params.offset = filter.offset;
    }
    if (!params.limit) {
      params.limit = filter.limit;
    }
  }
  const { response, error } = yield call(apiRequest, 'get', '/albums', data);

  if (error) {
    yield put({
      type: FETCH_ALBUM_LIST.FAILURE,
      error,
    });
  } else {
    yield put({
      type: FETCH_ALBUM_LIST.SUCCESS,
      result: response,
    });
  }
}

export default function* albumsSaga() {
  yield all([
    takeLatest(FETCH_ALBUM_LIST.REQUEST, watchfetchAlbumPhoto),
  ]);
}
