import * as React from 'react';
import { create } from 'react-test-renderer';
import { initialState } from 'redux/albums/reducer';
import { mount } from 'enzyme';
import { AlbumsPage } from './index';

describe("AlbumsPage", () => {
  let props: any;
  beforeEach(() => {
    props = {
      ...initialState,
      location: {
        search: ''
      },
      history: '',
      fetchAlbumList: jest.fn(),
    }
  });

  test("render without fail and match snapshot", () => {
    const page = create(<AlbumsPage {...props} />);
    expect(page.toJSON()).toMatchSnapshot();
  });

  test("fetch album in did mount", () => {
    const wrapper = mount(<AlbumsPage {...props} />);
    expect(props.fetchAlbumList).toHaveBeenCalled();
  });

  // test("render loading when is fetching data", () => {

  // });
});