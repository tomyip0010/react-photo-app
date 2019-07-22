type PhotoType = {
  albumId: number,
  id: number,
  thumbnailUrl: string,
  title: string,
  url: string,
}

interface PhotosStoreType {
  isFetching: boolean,
  fetchSuccess: boolean,
  albumPhotos: Array<PhotoType>,
  totalCount: number,
  filter: FilterType,
  error: any,
}