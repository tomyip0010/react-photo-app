type AlbumType = {
  id: number,
  title: string,
  userId: number,
}

interface AlbumsStoreType {
  isFetching: boolean,
  fetchSuccess: boolean,
  albumList: Array<AlbumType>,
  totalCount: number,
  filter: FilterType,
  error?: any,
}