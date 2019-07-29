import * as React from 'react';
import NavBar from 'components/NavBar';
import styled from 'styled-components';
import { Section } from 'components/SharedStyle';

const Content = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

type Props = {};

const NoMatchPage = () => (
  <div className="noMatchPage">
    <NavBar />
    <Section>
      <Content>No Match</Content>
    </Section>
  </div>
);

export default React.memo<Props>(NoMatchPage);
