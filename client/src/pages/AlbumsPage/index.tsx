import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import NavBar from 'components/NavBar';
import styled from 'styled-components';
import { fetchAlbumList } from 'redux/albums/action';
import ListPagination from 'components/ListPagination';
import LoadingScreen from 'components/LoadingScreen';
import { Section } from 'components/SharedStyle';
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card';

type ReduxType = {

} & AlbumsStoreType;

type ColorType = 'primary' | 'secondary' | 'success' |
 'danger' | 'warning' |'info' | 'light' | 'dark';

type Props = {
  fetchAlbumList: typeof fetchAlbumList,
  location: any,
  history: any,
} & ReduxType;

const mapStateToProps = (state: ReduxStoreType) => ({
  isFetching: state.albums.isFetching,
  fetchSuccess: state.albums.fetchSuccess,
  totalCount: state.albums.totalCount,
  albumList: state.albums.albumList,
  filter: state.albums.filter,
  error: state.albums.error,
});

const mapDispatchToProps = {
  fetchAlbumList,
};

const AlbumCard = styled(Card)`
  flex: 1;
  min-width: 20%;
  margin: 20px 20px 20px 0;
  padding: 16px;
  border-radius: 8px !important;
`;

const bgGroup: Array<ColorType> = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'dark',
];

const ITEM_PER_PAGE = 20;

export const AlbumsPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, fetchAlbumList, albumList, filter,
    totalCount, history, isFetching, error,
  } = props;
  let currentPage = 0;

  React.useEffect(() => {
    const query = queryString.parse(search);
    const refresh = query && query.refresh ? query.refresh === 'true' : false;
  
    fetchAlbumList(null, refresh);
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
    fetchAlbumList(filter);
  }, [fetchAlbumList]);

  const handleOnClick = React.useCallback((id: number) => {
    history.push(`/photos?albumId=${id}`);
  }, [history]);

  if (filter.offset) {
    currentPage = Math.floor(filter.offset / ITEM_PER_PAGE);
  }

  return (
    <div className="albumsPage">
      <NavBar title="Albums" />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <Section>
          {!!albumList && albumList.length ? (
            <CardGroup>
              {albumList.map((album: any, index: number) => {
                const rand = Math.floor(Math.random() * bgGroup.length);
                const colorSet = bgGroup[rand];
                return (
                  <AlbumCard
                    bg={colorSet}
                    text="white"
                    key={`${album.title}-${index}`}
                    onClick={() => handleOnClick(album.id)}
                  >
                    {album.title}
                  </AlbumCard>
                )
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);
