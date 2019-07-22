import { all } from 'redux-saga/effects'; //
import albumSaga from './album/saga';
import gallerySaga from './gallery/saga';

export default function* root() {
  yield all([
    albumSaga(),
    gallerySaga(),
  ])
};
