import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'


//components
import BookShelf      from    './components/BookShelf'
import SearchResults  from    './components/SearchResults'
import SearchBar      from    './components/SearchBar'
import {Route,Link}        from    'react-router-dom'
class BooksApp extends React.Component {
  state = {
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
            <Route exact path='/search' render={() => (
              <div className="search-books">
                  <SearchBar onSearchChange={(text) => {
                    this.setState((prevState) =>({
                      searchText:text
                    }))
                  }}/>
                <SearchResults
                  search={this.state.searchText}
                  currentBooks={this.state.books}
                  updateShelf={(book,shelf) => {
                      BooksAPI.update(book,shelf);
                      let newState=this.state.books.filter((b) => (book.id)!==b.id)
                      book.shelf=shelf;
                      newState.push(book);
                      this.setState((prevState) => ({
                        books:newState
                      }))
                  }}/>
              </div>
            )}/>
            <Route exact path="/" render={() =>(
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
                    <Link to='/search'>Add a book</Link>
                  </div>
              </div>
            )}/>
        </div>
    )
  }
}

export default BooksApp
