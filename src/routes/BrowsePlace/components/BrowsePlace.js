import React, { Component } from 'react'

class BrowsePlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.setSearchStr = this.setSearchStr.bind(this)
    }

    
    setSearchStr(event) {
        this.setState({ searchStr: event.target.value })
    }


    render() {
        return (
            <div className="profile-place">
                <input type="text"
                        className="browse-food-search form-control"
                        id="searchStr"
                        placeholder="search place"
                        value={this.state.searchStr}
                        onChange={this.setSearchStr} />
            </div>
        )
    }
}

module.exports = BrowsePlace