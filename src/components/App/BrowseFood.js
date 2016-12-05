import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import AddFood from './AddFood'
import InfoList from './InfoList'

export default class BrowseFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.observeFood = this.observeFood.bind(this)
    }


    componentDidMount() {
        this.observeFood()
    }


    observeFood() {
        let this_ = this
        let ref = firebase
            .database()
            .ref('food/')
        ref.on('value', function (snapshot) {
            var data = snapshot.val()
            if (data != null) {
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                array.reverse()
                console.log('BrowseFood data', array)
                this_.setState({ data: array })
            } else {
                this_.setState({ data: [] })
            }
        })
    }


    render() {
        // 0 search results
        if (this.state.queryStr !== ""
            && this.state.list
            && this.state.list.length === 0) {
            return (
                <div className="browse-food">
                    <AddFood />
                </div>
            )
        }

        // show a list!
        return (
            <div className="browse-food">
                <AddFood />
                <InfoList data={this.state.data} />
            </div>
        )
    }  // render


}  // BrowseFood
