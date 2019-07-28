import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';
import { fetchPhotoDetail } from 'redux/photoDetail/action';
import LoadingScreen from 'components/LoadingScreen';
import NavBar from 'components/NavBar';

type ReduxType = {

} & PhotoDetailStoreType;

type Props = {
  location: Location,
  history: any,
  match: any,
  fetchPhotoDetail: typeof fetchPhotoDetail,
} & ReduxType;

const InnerWrapper = styled.div`
  margin: 40px 0;
`;

const mapStateToProps = (state: ReduxStoreType) => ({
  photoDetail: state.photoDetail.photoDetail,
  isFetching: state.photoDetail.isFetching,
});

const mapDispatchToProps = {
  fetchPhotoDetail,
};

const PhotoDetailPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, photoDetail, match, fetchPhotoDetail,
    isFetching, history,
  } = props;
  const { params: { photoId } } = match;

  React.useEffect(() => {
    const query = queryString.parse(search);
    const refresh = query && query.refresh ? query.refresh === 'true' : false;
    fetchPhotoDetail(photoId, refresh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoId]);

  const handleGoBack = React.useCallback(() => {
    history.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <LoadingScreen />;
  }

  if (!Object.keys(photoDetail).length) {
    return <div />;
  }

  const detail = photoDetail as PhotoType;

  return (
    <div className="photoDetail">
      <NavBar title="Photo Detail" handleNavBack={handleGoBack} />
      <InnerWrapper>
        <img src={detail.url} alt={detail.title} />
        <div>title: {detail.title}</div>
        <div>id: {detail.id}</div>
        <div>albumId: {detail.albumId}</div>
      </InnerWrapper>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetailPage);
