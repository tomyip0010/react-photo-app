interface GalleryStoreType {
  isFetching: boolean,
  fetchSuccess: boolean,
  albumList: Array<any>,
  totalCount: number,
  filter: FilterType,
  error?: any,
}