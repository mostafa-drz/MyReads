import React from 'react'

class SearchBar extends React.Component{
    render(){
        return(
            <div className="search-books-bar">
                <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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