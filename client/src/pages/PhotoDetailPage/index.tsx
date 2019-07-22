import * as React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { fetchPhotoDetail } from 'redux/photoDetail/action';

type ReduxType = {

} & PhotoDetailStoreType;

type Props = {
  location: Location,
  match: any,
  fetchPhotoDetail: typeof fetchPhotoDetail,
} & ReduxType;

const mapStateToProps = (state: ReduxStoreType) => ({
  photoDetail: state.photoDetail.photoDetail,
});

const mapDispatchToProps = {
  fetchPhotoDetail,
};

const PhotoDetailPage: React.FC<Props> = (props: Props) => {
  const {
    location: { search }, photoDetail, match, fetchPhotoDetail,
} = props;
  const { params: { photoId } } = match;

  React.useEffect(() => {
    const query = queryString.parse(search);
    const refresh = query && query.refresh ? query.refresh === 'true' : false;
    fetchPhotoDetail(photoId, refresh);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  React.useEffect(() => {
    fetchPhotoDetail(photoId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoId]);

  if (!Object.keys(photoDetail).length) {
    return <div />;
  }

  const detail = photoDetail as PhotoType;

  return (
    <div className="photoDetail">
      <img src={detail.url} alt={detail.title} />
      <div>{detail.title}</div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetailPage);
