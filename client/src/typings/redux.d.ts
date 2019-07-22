interface GenericActionType {
  type: string,
  params?: any,
  result?: any,
  [string: string]: any,
};

interface ReduxStoreType {
  albums: AlbumsStoreType,
  photos: PhotosStoreType,
  photoDetail: PhotoDetailStoreType,
}

interface FilterType {
  limit: number,
  offset: number,
}