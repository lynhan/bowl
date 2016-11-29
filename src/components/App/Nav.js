import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchStr: ""
        }
        this.setSearchStr = this.setSearchStr.bind(this)
    }


    setSearchStr(event) {
        this.setState({ searchStr: event.target.value })
    }


    render() {
        return (
            <div className="nav">

                <span className="nav-home right">
                    <Link to="/food" activeClassName="active">FOOD</Link>
                </span>

                <span className="nav-home right">
                    <Link to="/place" activeClassName="active">PLACE</Link>
                </span>

                <span className="nav-me right">
                    <Link to="/me" activeClassName="active">ME</Link>
                </span>

                <span className="nav-search right">
                    <input type="text"
                        className="form-control small-right"
                        id="searchStr"
                        value={this.state.searchStr}
                        onChange={this.setSearchStr} />
                </span>

            </div>
        )
    }  // render
}  // Nav
