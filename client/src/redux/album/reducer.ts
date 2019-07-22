import { FETCH_ALBUM_PHOTOS } from './action';

const initialState: AlbumStoreType = {
  isFetching: false,
  fetchSuccess: false,
  albumPhotos: [],
  filter: {},
  error: {},
};

export default function reducer(
  state = initialState,
  action: GenericActionType,
) {
  switch (action.type) {
    case FETCH_ALBUM_PHOTOS.REQUEST:
      return {
        ...state,
        albumPhotos: [],
        isFetching: true,
      };
    case FETCH_ALBUM_PHOTOS.SUCCESS:
      return {
        ...state,
        albumPhotos: action.result.data,
        isFetching: false,
        fetchSuccess: true,
      };
    case FETCH_ALBUM_PHOTOS.FAILURE:
      return {
        ...state,
        isFetching: false,
        fetchSuccess: false,
        error: action.error,
      };
    default:
      return initialState;
  }
}