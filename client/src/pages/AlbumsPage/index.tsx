import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { fetchAlbumList } from 'redux/albums/action';
import ListPagination from 'components/ListPagination';
import Spinner from 'react-bootstrap/Spinner'
import 'components/SharedStyle.css';
import './styles.css';

type ReduxType = {

} & AlbumsStoreType;

type Props = {
  fetchAlbumList: typeof fetchAlbumList,
  location: Location,
  history: any,
} & ReduxType;

const mapStateToProps = (state: ReduxStoreType) => ({
  isFetching: state.albums.isFetching,
  fetchSuccess: state.albums.fetchSuccess,
  totalCount: state.albums.totalCount,
  albumList: state.albums.albumList,
  filter: state.albums.filter,
});

const mapDispatchToProps = {
  fetchAlbumList,
};

const ITEM_PER_PAGE = 20;

const AlbumsPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, fetchAlbumList, albumList, filter,
    totalCount, history, isFetching,
  } = props;
  let currentPage = 0;

  React.useEffect(() => {
    const query = queryString.parse(search);
    const refresh = query && query.refresh ? query.refresh === 'true' : false;
  
    fetchAlbumList(null, refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isFetching) {
    return <Spinner animation="border" variant="info" />;
  }

  return (
    <div className="albumsPage">
      {!!albumList && albumList.length && (
        <div className="section">
          {albumList.map((album: any, index: number) => (
            <div
              className="block album"
              key={`${album.title}-${index}`}
              onClick={() => handleOnClick(album.id)}
            >
              {album.title}
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsPage);
