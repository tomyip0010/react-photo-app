import { FETCH_ALBUM_LIST } from './action';

const initialState: GalleryStoreType = {
  isFetching: false,
  fetchSuccess: false,
  albumList: [],
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
    case FETCH_ALBUM_LIST.REQUEST:
      return {
        ...state,
        albumList: [],
        isFetching: true,
      };
    case FETCH_ALBUM_LIST.SUCCESS:
      return {
        ...state,
        albumList: action.result.data,
        totalCount: action.result.totalCount,
        filter: {
          limit: action.result.limit,
          offset: action.result.offset,
        },
        isFetching: false,
        fetchSuccess: true,
      };
    case FETCH_ALBUM_LIST.FAILURE:
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