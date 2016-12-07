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
                    <Link to="/browsefood" className="nav-link">FOOD</Link>
                </span>
                <span>
                    <Link to="/browseplaces" className="nav-link">PLACE</Link>
                </span>
                <span>
                    <Link to="/submit" className="nav-link">SUBMIT</Link>
                </span>
                <span>
                    <Link to="/me" className="nav-link">ME</Link>
                </span>
            </div>
        )
    }  // render
}  // Nav
