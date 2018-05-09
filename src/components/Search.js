import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import InsertLink from '@material-ui/icons/InsertLink';
import Search from '@material-ui/icons/Search';
import IconButton from 'material-ui/IconButton';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';

class SearchWiki extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      wiki: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = search => event => {
    this.setState({
      [search]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    //const keyword = this.refs.query.value;
    const keyword = this.state.search;
    var wikis = [];

    if (keyword !== '') {
      axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + keyword + '&format=json&origin=*')
        .then((response) => {
          wikis = response.data[1].map((wiki,index) => {
            return(
              <ListItem divider='true'>
                <ListItemText primary={wiki}
                  secondary={response.data[2][index]} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="HyperLink" href={response.data[3][index]}>
                    <InsertLink />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
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
            {/*<input type="text" name="search" ref="query" placeholder="Search Wikipedia..." />*/}
            <TextField id="search"
              label="Search"
              value={this.state.search}
              onChange={this.handleChange('search')}
              margin="normal"
              />
            <div className="buttons">
              <Button variant="raised" type="submit" color="primary">
                <Search className="icon"/>
                Search
              </Button>
              <Button variant="raised" color="primary" onClick={this.onRandomWiki.bind(this)}>Random</Button>
            </div>
          </form>
        </h1>
        <List>
          {this.state.wiki}
        </List>
      </div>
    );
  }
}

export default SearchWiki;
