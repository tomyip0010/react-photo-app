import { createRequestTypes } from 'helper/reducerActionGenerator';

export const FETCH_ALBUM_PHOTOS = createRequestTypes('FETCH_ALBUM_PHOTOS');
export const CLEAR_FILTER = 'CLEAR_FILTER';

export const fetchAlbumPhotos = (id: string, filter: null | FilterType, refresh?: boolean): GenericActionType => {
  return {
    type: FETCH_ALBUM_PHOTOS.REQUEST,
    params:{
      id,
      refresh,
      ...filter,
    }
  }
}

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  }
}