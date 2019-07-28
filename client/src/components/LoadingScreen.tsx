import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingScreen = () => (
  <Wrapper>
    <Spinner animation="border" variant="info" />
  </Wrapper>
);

export default LoadingScreen;
