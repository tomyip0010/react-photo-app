import * as React from 'react';
import NavBar from 'components/NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AlbumsPage from 'pages/AlbumsPage';
import PhotosPage from 'pages/PhotosPage';
import PhotoDetailPage from 'pages/PhotoDetailPage';
import './App.css';

type Props = {};

const App: React.FC<Props> = (props: Props) => (
  <div className="App">
    <Router>
      <NavBar />
      <Route exact path="/albums" component={AlbumsPage} />
      <Route exact path="/photos" component={PhotosPage} />
      <Route path="/photos/:photoId" component={PhotoDetailPage} />
    </Router>
  </div>
);

export default App;
