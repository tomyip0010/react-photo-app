import * as React from "react";
import ReactDOM from 'react-dom';
import LoadingScreen from './index';

describe('LoadingScreen', () => {
  it('Render without fail', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoadingScreen />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});