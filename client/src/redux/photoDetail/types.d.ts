interface PhotoDetailStoreType {
  isFetching: boolean,
  fetchSuccess: boolean,
  photoDetail: {} | PhotoType,
  error: any,
}