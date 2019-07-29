import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import { fetchAlbumPhotos, clearFilter } from 'redux/photos/action';
import ListPagination from 'components/ListPagination';
import LoadingScreen from 'components/LoadingScreen';
import { Section } from 'components/SharedStyle';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card';

type ReduxType = {

} & PhotosStoreType;

type Props = {
  history: any,
  fetchAlbumPhotos: typeof fetchAlbumPhotos,
  clearFilter: typeof clearFilter,
  location: Location,
} & ReduxType;

const PhotoCard = styled(Card)`
  flex: 1;
  padding: 16px;
  border: none;
  min-width: 150px;
  min-height: 150px;
`;

const mapStateToProps = (state: ReduxStoreType) => ({
  isFetching: state.photos.isFetching,
  fetchSuccess: state.photos.fetchSuccess,
  totalCount: state.photos.totalCount,
  albumPhotos: state.photos.albumPhotos,
  filter: state.photos.filter,
  error: state.photos.error,
});

const mapDispatchToProps = {
  fetchAlbumPhotos,
  clearFilter,
};

const ITEM_PER_PAGE = 20;

const PhotosPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, fetchAlbumPhotos, albumPhotos, filter,
    totalCount, history, isFetching, clearFilter, error,
  } = props;
  const query = queryString.parse(search);
  const refresh = query && query.refresh ? query.refresh === 'true' : false;
  const albumId = query && query.albumId ? query.albumId as string : null;
  let currentPage = 0;

  React.useEffect(() => {
    if (!!albumId) {
      fetchAlbumPhotos(albumId, null, refresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (error && error.message) {
      history.push('/no-match');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleOnPageClick = React.useCallback((pageNumber: number) => {
    const filter = {
      offset: pageNumber * ITEM_PER_PAGE,
      limit: ITEM_PER_PAGE,
    }
    if (!!albumId) {
      fetchAlbumPhotos(albumId, filter);
    }
  }, [fetchAlbumPhotos, albumId]);

  const handleOnClick = React.useCallback((id: number) => {
    history.push(`/photos/${id}`);
  }, [history]);

  const handleGoBack = React.useCallback(() => {
    clearFilter();
    history.push('/albums');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearFilter]);

  if (filter.offset) {
    currentPage = Math.floor(filter.offset / ITEM_PER_PAGE);
  }

  return (
    <div className="photosPage">
      <NavBar title="Photos" handleNavBack={handleGoBack} />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <Section>
        {!!albumPhotos && albumPhotos.length ? (
          <CardGroup>
            {albumPhotos.map((photo: PhotoType, index: number) => (
              <PhotoCard
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
              </PhotoCard>
            ))}
          </CardGroup>
          ) : null}
        </Section>
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
