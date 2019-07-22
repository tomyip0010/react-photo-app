import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { fetchAlbumPhotos } from 'redux/photos/action';
import ListPagination from 'components/ListPagination';
import 'components/SharedStyle.css';

type ReduxType = {

} & PhotosStoreType;

type Props = {
  history: any,
  fetchAlbumPhotos: typeof fetchAlbumPhotos,
  location: Location,
} & ReduxType;

const mapStateToProps = (state: ReduxStoreType) => ({
  isFetching: state.photos.isFetching,
  fetchSuccess: state.photos.fetchSuccess,
  totalCount: state.photos.totalCount,
  albumPhotos: state.photos.albumPhotos,
  filter: state.photos.filter,
});

const mapDispatchToProps = {
  fetchAlbumPhotos,
};

const ITEM_PER_PAGE = 20;

const PhotosPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, fetchAlbumPhotos, albumPhotos, filter,
    totalCount, history,
  } = props;
  const query = queryString.parse(search);
  const refresh = query && query.refresh ? query.refresh === 'true' : false;
  const albumId = query && query.albumId ? Number(query.albumId) : null;
  let currentPage = 0;

  React.useEffect(() => {
    if (!!albumId) {
      fetchAlbumPhotos(albumId, null, refresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!!albumId) {
      fetchAlbumPhotos(albumId, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumId]);

  const handleOnPageClick = React.useCallback((pageNumber: number) => {
    const query = queryString.parse(search);
    const albumId = query && query.albumId ? Number(query.albumId) : null;

    const filter = {
      offset: pageNumber * ITEM_PER_PAGE,
      limit: ITEM_PER_PAGE,
    }
    if (!!albumId) {
      fetchAlbumPhotos(albumId, filter);
    }
  }, [fetchAlbumPhotos, search]);

  const handleOnClick = React.useCallback((id: number) => {
    history.push(`/photos/${id}`);
  }, [history]);

  if (filter.offset) {
    currentPage = Math.floor(filter.offset / ITEM_PER_PAGE);
  }

  return (
    <div className="photosPage">
      {!!albumPhotos && albumPhotos.length && (
        <div className="section">
          {albumPhotos.map((photo: PhotoType, index: number) => (
            <div
              className="block"
              key={`${photo.title}-${index}`}
              onClick={() => handleOnClick(photo.id)}
            >
              <img
                className="album-thumbnail"
                src={photo.thumbnailUrl}
                alt={`${photo.title}-thumbnail`}
              />
              <div>
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      )}
      <ListPagination
        totalCount={totalCount}
        itemPerPage={ITEM_PER_PAGE}
        currentPage={currentPage}
        handlePageChange={handleOnPageClick}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
