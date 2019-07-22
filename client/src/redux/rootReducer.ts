import { combineReducers } from 'redux';
import gallery from './gallery/reducer';
import album from './album/reducer';

export default combineReducers({
  gallery,
  album,
});
