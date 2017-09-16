import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'


//components
import BookShelf      from    './components/BookShelf'
import SearchResults  from    './components/SearchResults'
import SearchBar      from    './components/SearchBar'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[],
    shelves:[],
    searchText:''
  }
  componentWillMount(){
    BooksAPI.getAll().then((res) =>{
      this.setState((prevState) => ({
        books:res,
        shelves:[{type:'currentlyReading',title:'Currently Reading'},{type:'wantToRead',title:'Want To Read'},{type:'read',title:"Read"},{type:'none',title:''}]
      }))
    })
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBar onSearchChange={(text) => {
              this.setState((prevState) =>({
                searchText:text
              }))
            }}/>
            <SearchResults
             search={this.state.searchText}
             updateShelf={(book,shelf) => {
                BooksAPI.update(book,shelf);
                let newState=this.state.books.filter((b) => (book.id)!==b.id)
                book.shelf=shelf;
                newState.push(book);
                this.setState((prevState) => ({
                  books:newState
                }))
            }}
            />
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf) => ( shelf.type!=='none' &&
                  <BookShelf 
                  title={shelf.title}
                  books={this.state.books.filter((book) => (book.shelf)===shelf.type)}
                  key={shelf.type}
                  updateShelf={(book,shelf) => {
                    BooksAPI.update(book,shelf);
                    let newState=this.state.books.filter((b) => (book.id)!==b.id)
                    book.shelf=shelf;
                    newState.push(book);
                    this.setState((prevState) => ({
                      books:newState
                    }))
                  }}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
