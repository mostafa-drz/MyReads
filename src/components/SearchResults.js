import React from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
class SearchResults extends React.Component{
    state={
        results:[],
        books:[]
    }

    componentWillReceiveProps(nextProps){
        let resultBooks;
    
        BooksAPI.search(nextProps.search).then((res) => {
            resultBooks=res;
        
        }).then(() =>{
            this.setState(() => ({
                results:resultBooks
            }))
        })
        
    }

    render(){
        return(
          <div className="search-books-results">
                <ol className="books-grid">
                {
                  
                    (this.state.results && this.state.results.length>0 &&
                        this.state.results.map((book) => (
                            <Book
                            title={book.title}
                            authors={book.authors} 
                            shelf={book.shelf}
                            image={book.imageLinks.thumbnail} 
                            key={book.id}
                            onShelfChange={(shelf) => {
                                this.props.updateShelf(book,shelf)
                            }}
                            />
                        ))
                    )
                  
                }
                </ol>
          </div>
        )
    }

}

export default SearchResults;