import React, { Component } from 'react'
import Food from '../../../container/Food'

export default class FoodList extends Component {
    render() {
        console.log("food list data", this.props.data)
        if ((this.props.data
            && this.props.data.length === 0)
            || !this.props.data) {
            return (
                <div className="menu">
                    Empty menu!
                </div>
            )
        }
        let data = this.props.data
        data.sort(function (a, b) {
            let aLove = a.love / (a.love + a.hate)
            let bLove = b.love / (b.love + b.hate)
            return bLove - aLove
        })
        console.log("SORTED", data)
        let list = data.map(function (item, index) {
            return (
                <div key={index}>
                    <Food data={item} />
                </div>
            )
        })
        return (
            <div className="menu">
                {list}
            </div>
        )  // end return
    }  // end render
}  // end FoodList
