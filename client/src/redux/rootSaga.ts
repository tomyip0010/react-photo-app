import { all } from 'redux-saga/effects'; //
import albumsSaga from './albums/saga';
import photosSaga from './photos/saga';
import photoDetailSaga from './photoDetail/saga';

export default function* root() {
  yield all([
    albumsSaga(),
    photosSaga(),
    photoDetailSaga(),
  ])
};
