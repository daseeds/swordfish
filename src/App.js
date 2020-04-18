import React from 'react';
import './App.css';
import Page from './containers/Page'
import Layout from './hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Page />
      </Layout>
    </div>
  );
}

export default App;
