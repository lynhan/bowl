import React, { Component } from 'react'
import Food from './Food'

export default class FoodList extends Component {
    render() {
        console.log("food list data", this.props.data)
        if ( (this.props.data
            && this.props.data.length === 0) 
            || !this.props.data) {
            return (
                <div className="menu">
                    Empty menu!
                </div>
            )
        }
        let list = this.props.data.map(function (item, index) {
            return (
                <div key={index}>
                    <Food data={item} />
                </div>
            )
        })
        return (
            <div className="menu">
                MENU
                {list}
            </div>
        )  // end return
    }  // end render
}  // end FoodList
