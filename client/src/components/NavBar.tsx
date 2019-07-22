import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from 'assets/logo.svg';

interface Props {

}

const NavBar = (props: Props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img src={logo} className="App-logo" alt="logo" />
        React Photo App
      </Navbar.Brand>
    </Navbar>
  );
}

export default React.memo<Props>(NavBar);
