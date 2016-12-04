import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import AddFood from './AddFood'
import InfoList from './InfoList'

export default class BrowseFood extends Component {

    constructor(props) {
        super(props)
        this.state = {
            queryStr: "",
            list: []
        }
        this.setQuery = this.setQuery.bind(this)
        this.listenForData = this.listenForData.bind(this)
    }


    setQuery(event) {
        this.setState({ query: event.target.value })
    }


    componentDidMount() {
        console.log("listening")
        this.listenForData()
    }


    listenForData(uid) {
        let this_ = this
        let foodRef = firebase
            .database()
            .ref('food/')

        foodRef.on('value', function(snapshot) {
            var data = snapshot.val()
            console.log('food', data)
            if (data != null) {
                // add id as a field
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                // latest is first
                array.reverse()
                this_.setState({ list: array })
            } else {
                this_.setState({ list: [] })
            }
        })  // end observer
    }


    render() {
        console.log("this.state.list", this.state.list)
        // 0 search results
        if (this.state.queryStr !== "" && this.state.list.length === 0) {
            return (
                <div className="browse-food">
                    BROWSE FOOD::
                    <AddFood />
                </div>
            )
        }

        // show a list!
        return (
            <div className="browse-food">
                BROWSE FOOD::
                <AddFood />
                <InfoList list={this.state.list} />
            </div>
        )
    }  // render


}  // BrowseFood
