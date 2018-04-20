import React, { Component } from 'react';

class Wikis extends Component {
  render() {
    return (
      <ul className="wikiList">
        {this.props.query}
      </ul>
    );
  }
}

export default Wikis;
