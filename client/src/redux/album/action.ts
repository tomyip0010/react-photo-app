import { createRequestTypes } from 'helper/reducerActionGenerator';

export const FETCH_ALBUM_PHOTOS = createRequestTypes('FETCH_ALBUM_PHOTOS');

export const fetchAlbumPhotos = (id: string): GenericActionType => {
  return {
    type: FETCH_ALBUM_PHOTOS.REQUEST,
    params:{
      id,
    }
  }
}