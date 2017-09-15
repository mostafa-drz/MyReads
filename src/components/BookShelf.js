import React from 'react'
import Book from './Book'
class BookShelf extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) =>(
                            <li key={book.id}>
                                <Book
                                image={book.imageLinks.thumbnail} 
                                title={book.title} authors={book.authors} 
                                shelf={book.shelf}
                                onShelfChange={(shelf) => {
                                    this.props.updateShelf(book,shelf)
                                }}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
        )
    }
}

export default BookShelf;