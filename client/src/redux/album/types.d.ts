interface AlbumStoreType {
  isFetching: boolean,
  fetchSuccess: boolean,
  albumPhotos: Array<any>,
  filter: any,
  error: any,
}