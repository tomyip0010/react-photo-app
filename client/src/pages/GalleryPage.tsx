import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { fetchAlbumList } from 'redux/gallery/action';
import ListGroup from 'react-bootstrap/ListGroup';
import ListPagination from 'components/ListPagination';

type ReduxType = {

} & GalleryStoreType;

type Props = {
  fetchAlbumList: typeof fetchAlbumList,
  location: Location,
} & ReduxType;

const mapStateToProps = (state: ReduxStoreType) => ({
  isFetching: state.gallery.isFetching,
  fetchSuccess: state.gallery.fetchSuccess,
  totalCount: state.gallery.totalCount,
  albumList: state.gallery.albumList,
  filter: state.gallery.filter,
});

const mapDispatchToProps = {
  fetchAlbumList,
};

const ITEM_PER_PAGE = 20;

const GalleryPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, fetchAlbumList, albumList, filter, totalCount,
  } = props;
  let currentPage = 0;

  React.useEffect(() => {
    const query = queryString.parse(search);
    const refresh = query && query.refresh ? query.refresh === 'true' : false;
  
    fetchAlbumList(null, refresh);
  }, [fetchAlbumList, search]);

  const handleOnClick = React.useCallback((pageNumber: number) => {
    const filter = {
      offset: pageNumber * ITEM_PER_PAGE,
      limit: ITEM_PER_PAGE,
    }
    fetchAlbumList(filter);
  }, [fetchAlbumList]);

  if (filter.offset) {
    currentPage = Math.floor(filter.offset / ITEM_PER_PAGE);
  }

  console.log('>>>>>MEMEMEMEM>>>>>', currentPage, filter, ITEM_PER_PAGE);
  return (
    <div className="gallery">
      {!!albumList && albumList.length && (
        <ListGroup>
          {albumList.map((album: any, index: number) => (
            <ListGroup.Item key={`${album.title}-${index}`}>{album.title}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <ListPagination
        totalCount={totalCount}
        itemPerPage={ITEM_PER_PAGE}
        currentPage={currentPage}
        handlePageChange={handleOnClick}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
