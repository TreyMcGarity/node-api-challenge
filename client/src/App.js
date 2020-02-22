import React from 'react';
import { Route } from 'react-router-dom';

import ProjectList from './components/ProjectList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ProjectList} />
    </div>
  );
}

export default App;
