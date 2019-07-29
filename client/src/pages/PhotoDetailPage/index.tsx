import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styled from 'styled-components';
import { fetchPhotoDetail } from 'redux/photoDetail/action';
import LoadingScreen from 'components/LoadingScreen';
import NavBar from 'components/NavBar';

type ContentType = 'title' | 'id' | 'albumId';

type ReduxType = {

} & PhotoDetailStoreType;

type Props = {
  location: Location,
  history: any,
  match: any,
  fetchPhotoDetail: typeof fetchPhotoDetail,
} & ReduxType;

const InnerWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 20px;;
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
`;

const DetailGroup = styled.div``;

const Row = styled.div`
  display: flex;
  margin: 8px 0;
`;

const Title = styled.div`
  text-transform: capitalize;
  font-weight: bold;
  margin-right: 8px;
`;

const Text = styled.div``;

const content: Array<ContentType> = ['title', 'id', 'albumId'];

const mapStateToProps = (state: ReduxStoreType) => ({
  photoDetail: state.photoDetail.photoDetail,
  isFetching: state.photoDetail.isFetching,
  error: state.photoDetail.error,
});

const mapDispatchToProps = {
  fetchPhotoDetail,
};

const PhotoDetailPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, photoDetail, match, fetchPhotoDetail,
    isFetching, history, error,
  } = props;
  const { params: { photoId } } = match;

  React.useEffect(() => {
    const query = queryString.parse(search);
    const refresh = query && query.refresh ? query.refresh === 'true' : false;
    fetchPhotoDetail(photoId, refresh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoId]);

  React.useEffect(() => {
    if (error && error.message) {
      history.push('/no-match');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const detail = photoDetail as PhotoType;

  const handleGoBack = React.useCallback(() => {
    history.push(`/photos?albumId=${detail.albumId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  return (
    <div className="photoDetail">
      <NavBar title="Photo Detail" handleNavBack={handleGoBack} />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <InnerWrapper>
          <Image src={detail.url} alt={detail.title} />
          <DetailGroup>
            {content.map((field: ContentType) => (
              <Row key={field}>
                <Title>
                  {field}:
                </Title>
                <Text>
                  {detail[field]}
                </Text>
              </Row>
            ))}
          </DetailGroup>
        </InnerWrapper>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetailPage);
