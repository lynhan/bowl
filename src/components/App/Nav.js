import React, { Component } from 'react'


export default class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: ""
        }
        this.setQuery = this.setQuery.bind(this)
    }


    setQuery(event) {
        this.setState({ query: event.target.value })
    }


    render() {
        return (
            <div className="nav">
                <span className="nav-home right">
                    HOME
                </span>
                <span className="nav-me right">
                    ME
                </span>
                    <input type="text"
                        className="form-control small-right"
                        id="query"
                        value={this.state.query}
                        onChange={this.setQuery} />
            </div>
        )
    }  // render
}  // Nav
