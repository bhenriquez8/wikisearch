# ReactJs Wikipedia Search Engine

A simple search engine that makes use of the MediaWiki API (inspired by freeCodeCamp's Intermediate Front-End
Development coding challenge). The search engine can be viewed [here](https://bhenriquez8.github.io/wikisearch)

### Tools Used:
- `create-react-app`
- [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)
- axios (for API calls)

In order to make XMLHttpRequests I decided to use axios instead of jQuery AJAX because it's easier to set up for in a
ReactJsApplication.

Adding it is as simple as typing `npm install --save axios` in the command line.

Normally it makes sense to make an API call in a lifecycle method like

`componentWillMount()`

But since I need user input in order to make the API call, I will have
to make it in a handler function.

Calling `this.setState` needs to be called inside axios `.then()` function, since it is a synchronous function and axios
makes an asynchronous call. 
