import React, { Component } from 'react'

// the default component we show on load

export default class Browse extends Component {

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
                BROWSE::
                INFO LIST OF PLACE / FOOD
                OR
                ADD FOOD
            </div>
        )
    }  // render
}  // Nav
