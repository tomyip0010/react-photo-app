import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AlbumsPage from 'pages/AlbumsPage';
import PhotosPage from 'pages/PhotosPage';
import PhotoDetailPage from 'pages/PhotoDetailPage';
import NoMatchPage from 'pages/NoMatchPage';
import './App.css';

type Props = {};

const App: React.FC<Props> = (props: Props) => (
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/albums" component={AlbumsPage} />
        <Redirect exact from="/" to="/albums" />
        <Route exact path="/photos" component={PhotosPage} />
        <Route path="/photos/:photoId" component={PhotoDetailPage} />
        <Route component={NoMatchPage} />
      </Switch>
    </Router>
  </div>
);

export default App;
