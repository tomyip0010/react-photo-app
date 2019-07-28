import * as React from 'react';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import logo from 'assets/logo.svg';

interface Props {
  title?: string,
  handleNavBack?: () => void,
}

const AppLogo = styled(Navbar.Brand)`
  flex: 1;
  max-width: 120px;
`;

const AppTitle = styled.div`
  flex: 3;
  text-align: left;
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const BackNav = styled.div`
  padding: 8px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px solid #343a40;
`;

const BackBtn = styled.button`
  background: none;
  border: 1px solid #343a40;
  border-radius: 4px;
  margin-right: 20px;
  &:hover, &:active, &:focus {
    background: #343a40;
    color: white;
  }
`;

const PageTitle = styled.div`
  color: #343a40;
  font-weight: bold;
`;

const NavBar: React.FC<Props> = (props: Props) => {
  const { title, handleNavBack } = props;

  const handleGoBack = React.useCallback(() => {
    if (!!handleNavBack) {
      handleNavBack();
    }
  }, [handleNavBack]);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <AppLogo href="#home">
          <img src={logo} alt="logo" />
        </AppLogo>
        <AppTitle>React Photo App</AppTitle>
      </Navbar>
      {(!!handleNavBack || !!title) && (
        <BackNav>
          {!!handleNavBack && (
            <BackBtn onClick={handleGoBack}>
              Back
            </BackBtn>
          )}
          {!!title && (
            <PageTitle>
              {title}
            </PageTitle>
          )}
        </BackNav>
      )}
    </div>
  );
}

export default React.memo<Props>(NavBar);
