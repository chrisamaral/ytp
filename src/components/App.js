import React, {Component} from 'react';
import Content from './Content.js';
import Header from './Header.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
