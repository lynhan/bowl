import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Nav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchStr: ""
        }
    }


    render() {
        return (
            <div className="nav">
                <span>
                    <Link to="/browsefood"
                    className="nav-link"
                    activeClassName="active">food</Link>
                </span>
                <span>
                    <Link to="/findplace"
                    className="nav-link"
                    activeClassName="active">place</Link>
                </span>
                <span>
                    <Link to="/me"
                    className="nav-link"
                    activeClassName="active">me</Link>
                </span>
            </div>
        )
    }  // render
}  // Nav
