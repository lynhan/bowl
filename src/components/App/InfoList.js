import React, { Component } from 'react'
import Info from './Info'

export default class InfoList extends Component {
    render() {
        if (this.props.data && this.props.data.length === 0) {
            return (
                <div className="info-list">
                    NOTHING TO SHOW
                </div>
            )
        }
        let infoList = this.props.data.map(function (item, index) {
            return (
                <div key={index}>
                    <Info data={item} />
                </div>
            )
        })
        return (
            <div className="info-list">
                {infoList}
            </div>
        )  // end return
    }  // end render
}  // end InfoLIst
