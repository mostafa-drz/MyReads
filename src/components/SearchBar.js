import React from 'react'
import {Link} from 'react-router-dom'
import {Debounce} from 'react-throttle'
class SearchBar extends React.Component{
    render(){
        return(
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <Debounce handler="onChange" time="500">
                        <input type="text" placeholder="Search by title or author"
                        onChange={(e) => this.props.onSearchChange(e.target.value)}
                        />
                    </Debounce>
                </div>
          </div>
        )
    }
}

export default SearchBar;