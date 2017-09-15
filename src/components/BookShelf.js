import React from 'react'
import Book from './Book'
class BookShelf extends React.Component{
    constructor(props){
        super(props);
        this.state={books:[]}
    }
    render(){
        return(
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.state.books.map((book) =>(
                            <li>
                                <Book id={book.id} title={book.title} author={book.author} updateShelf={(shelf) => {
                                    this.setState((prevState) =>{
                                        books:prevState.books.filter((currentBook) => (currentBook.id!==book.id))
                                    })
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