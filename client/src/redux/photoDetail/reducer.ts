import { FETCH_PHOTO_DETAIL } from './action';

const initialState: PhotoDetailStoreType = {
  isFetching: false,
  fetchSuccess: false,
  photoDetail: {},
  error: {},
};

export default function reducer(
  state = initialState,
  action: GenericActionType,
) {
  switch (action.type) {
    case FETCH_PHOTO_DETAIL.REQUEST:
      return {
        ...state,
        photoDetail: {},
        isFetching: true,
      };
    case FETCH_PHOTO_DETAIL.SUCCESS:
      return {
        ...state,
        photoDetail: action.result.data,
        isFetching: false,
        fetchSuccess: true,
      };
    case FETCH_PHOTO_DETAIL.FAILURE:
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