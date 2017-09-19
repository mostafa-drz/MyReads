import React from 'react'
import {Link} from 'react-router-dom'
class SearchBar extends React.Component{
    render(){
        return(
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                    onChange={(e) => this.props.onSearchChange(e.target.value)}
                    />
                </div>
          </div>
        )
    }
}

export default SearchBar;