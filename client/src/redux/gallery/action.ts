import { createRequestTypes } from 'helper/reducerActionGenerator';

export const FETCH_ALBUM_LIST = createRequestTypes('FETCH_ALBUM_LIST');

export const fetchAlbumList = (filter: null | FilterType, refresh?: boolean): GenericActionType => {
  return {
    type: FETCH_ALBUM_LIST.REQUEST,
    params: {
      refresh,
      ...filter,
    }
  }
}
