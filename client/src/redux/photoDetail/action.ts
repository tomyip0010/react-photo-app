import { createRequestTypes } from 'helper/reducerActionGenerator';

export const FETCH_PHOTO_DETAIL = createRequestTypes('FETCH_PHOTO_DETAIL');

export const fetchPhotoDetail = (id: number, refresh?: boolean): GenericActionType => {
  return {
    type: FETCH_PHOTO_DETAIL.REQUEST,
    id,
    params:{
      refresh,
    }
  }
}