import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import config from './config'

//components
import BookShelf      from    './components/BookShelf'
import SearchResults  from    './components/SearchResults'
import SearchBar      from    './components/SearchBar'
import {Route,Link}   from    'react-router-dom'
class BooksApp extends React.Component {
  state = {
    books:[],
    searchText:''
  }
  shelves=config.shelves;
  updateShelf = (book,shelf) =>{
    BooksAPI.update(book,shelf).then(() =>{
      book.shelf=shelf;
      this.setState(prevState => ({
        books:prevState.books.filter(b => (b.id!==book.id)).concat([book])
      }))
    })
  }
  componentWillMount(){
    BooksAPI.getAll().then((res) =>{
      this.setState((prevState) => ({
        books:res,
      }))
    })
  }
  render() {
      return (
        <div className="app">
            <Route exact path='/search' render={() => (
              <div className="search-books">
                  <SearchBar onSearchChange={(text) => {
                    this.setState(() =>({
                      searchText:text
                    }))
                  }}/>
                <SearchResults
                  search={this.state.searchText}
                  currentBooks={this.state.books}
                  updateShelf={this.updateShelf}
                />
              </div>
            )}/>
            <Route exact path="/" render={() =>(
              <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {this.shelves.map((shelf) => ( shelf.type!=='none' &&
                        <BookShelf 
                        title={shelf.title}
                        books={this.state.books.filter((book) => (book.shelf)===shelf.type)}
                        key={shelf.type}
                        updateShelf={this.updateShelf}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                  </div>
              </div>
            )}/>
        </div>
    )
  }
}
export default BooksApp
