import React, { Component, Fragment } from 'react';
import Container from './containers/Container';
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Container />
      </Fragment>
      
    )
  }
}

export default App;
