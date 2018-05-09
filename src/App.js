import React, { Component } from 'react';
import './App.css';
import SearchWiki from './components/Search';

class App extends Component {
  render() {
    return (
       <div className="App">
          <SearchWiki />
        </div>
    );
  }
}

export default App;
