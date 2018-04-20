import React, { Component } from 'react';
import axios from 'axios';
import Wikis from './Wikis';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      wiki: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const keyword = this.refs.query.value;
    var wikis = [];

    if (keyword !== '') {
      axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + keyword + '&format=json&origin=*')
        .then((response) => {
          wikis = response.data[1].map((wiki,index) => {
            return(
              <li key={wiki}><a href={response.data[3][index]}>{wiki}</a></li>
            )
          })
          this.setState({
            wiki: wikis
          });
        })
        .catch(function(error) {
          console.log(error);
        });
        document.getElementsByName('wiki-form')[0].reset();
    }
  }

  onRandomWiki(e) {
    e.preventDefault();
    window.location = "https://en.wikipedia.org/wiki/Special:Random";
  }

  render() {
    return (
      <div className="search">
        <h1>Wikipedia Search Engine
          <form onSubmit={this.handleClick} name='wiki-form'>
            <input type="text" name="search" ref="query" placeholder="Search Wikipedia..." />
            <div className="buttons">
              <button className="button" type="submit">Search</button>
              <button className="button" onClick={this.onRandomWiki.bind(this)}>Random Wiki</button>
            </div>
          </form>
        </h1>
        <Wikis query={this.state.wiki}/>
      </div>
    );
  }
}

export default Search;
