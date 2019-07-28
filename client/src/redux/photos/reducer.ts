import { FETCH_ALBUM_PHOTOS, CLEAR_FILTER } from './action';

const initialState: PhotosStoreType = {
  isFetching: false,
  fetchSuccess: false,
  albumPhotos: [],
  totalCount: 0,
  filter: {
    limit: 20,
    offset: 0,
  },
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
        totalCount: action.result.totalCount,
        filter: {
          limit: action.result.limit,
          offset: action.result.offset,
        },
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
    case CLEAR_FILTER:
      return {
        ...state,
        filter: {
          limit: 20,
          offset: 0,
        },
      }
    default:
      return state;
  }
}