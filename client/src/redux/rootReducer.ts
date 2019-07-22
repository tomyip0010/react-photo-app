import { combineReducers } from 'redux';
import albums from './albums/reducer';
import photos from './photos/reducer';
import photoDetail from './photoDetail/reducer';

export default combineReducers({
  albums,
  photos,
  photoDetail,
});
