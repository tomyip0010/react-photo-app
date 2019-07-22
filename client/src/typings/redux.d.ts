interface GenericActionType {
  type: string,
  params?: any,
  result?: any,
  [string: string]: any,
};

interface ReduxStoreType {
  gallery: GalleryStoreType,
  album: AlbumStoreType,
}

interface FilterType {
  limit: number,
  offset: number,
}