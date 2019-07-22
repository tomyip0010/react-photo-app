import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GalleryPage from 'pages/GalleryPage';
import logo from './logo.svg';
import './App.css';

type Props = {};

const App: React.FC<Props> = (props: Props) => {


  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img src={logo} className="App-logo" alt="logo" />
            React Photo App
          </Navbar.Brand>
        </Navbar>
        <Route exact path="/" component={GalleryPage} />
      </Router>
    </div>
  );
}

export default App;
