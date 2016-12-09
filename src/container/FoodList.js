import React, { Component } from 'react'
import FoodListItem from './FoodListItem'

export default class InfoList extends Component {
    render() {
        if (this.props.data && this.props.data.length === 0) {
            return (
                <div className="info-list">
                    Nothing so far :D
                </div>
            )
        }
        if (!this.props.data) {
            return (
                <div className="info-list">
                    Nothing so far :D
                </div>
            )
        }
        // render items
        let list = this.props.data.map(function (item, index) {
            return (
                <div key={index}>
                    <FoodListItem data={item} />
                </div>
            )
        })
        return (
            <div className="info-list">
                {list}
            </div>
        )  // end return
    }  // end render
}  // end InfoLIst
