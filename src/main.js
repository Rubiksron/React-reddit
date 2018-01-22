import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r'

//App - - manage applicataion state
//SearchForm - - collect user input and call a handleSearch function
//SearchResultsList - - display reddit articles

//::::::::::::::::::::SearchForm::::::::::::::::::::::::::::
class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSearch(this.state.searchText)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <label> {this.props.title} </label>
        <input
          type='text'
          onChange={this.handleChange} 
          value={this.state.searchText}
        />
        <button type='submit'> search </button>
      </form>
    )
  }
}

//::::::::::::::::::::SearchResultsList::::::::::::::::::::
//should receive reddit article and array of reddit articles through props
class SearchResultsList extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    let articles = this.props.articles || []
    return (
      <ul>
        {articles.map((item, i) => 
          <li key={i}>
            <a href={item.data.url}> {item.data.title} </a>
          </li>
        )}
      </ul>
    )
  }
}




//::::::::::::::APP::::::::::::::::::::::::::::::::::::::
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      results: null,
      searchErrorMessage: null,
    }

    this.redditBoardFetch = this.redditBoardFetch.bind(this)
  }

  componentDidUpdate(){ 
    console.log(':::::::::STATE::::::::::', this.state)
  }

  redditBoardFetch(board) {
    superagent.get(`${API_URL}/${board}.json`)
      .then(res => {
        console.log('request success', res)
        this.setState({
          results: res.body.data.children,
          searchErrorMessage: null, 
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          results: null,
          searchErrorMessage: `Unable to find the reddit board ${board}.`,
        })
      })
  }

  render(){  
    return (
      <main>
        <h1> apple sauce </h1>
        <SearchForm 
          title='Reddit Board' 
          handleSearch={this.redditBoardFetch}
        />
        <SearchResultsList articles={this.state.results} />
      </main>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))