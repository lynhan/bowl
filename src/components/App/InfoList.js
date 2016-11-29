import React, { Component } from 'react'
import Info from './Info'

export default class InfoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }


    render() {
        if (this.state.list.length === 0) {
            return (
                <div className="info-list">
                    NOTHING TO SHOW
                </div>
            )
        }

        let infoList = this.state.list.map(function (item, index) {
            return (
                <div key={index}>
                    <Info info={item} />
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
