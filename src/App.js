import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <Route path="/:locale/:page" exact component={Layout} />
      </div>
    </BrowserRouter>
  );
}

export default App;
