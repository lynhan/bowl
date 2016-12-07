import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import AddPlace from './AddPlace'
import InfoList from './InfoList'

export default class BrowsePlace extends Component {

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
        this.listenForData()
    }


    listenForData(uid) {
        let this_ = this
        let placeRef = firebase
            .database()
            .ref('place/')

        placeRef.on('value', function (snapshot) {
            var data = snapshot.val()
            console.log('place', data)
            if (data != null) {
                // add id as a field
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                // latest is first
                array.reverse()
                this_.setState({ placeList: array })
            } else {
                this_.setState({ placeList: [] })
            }
        })
    }


    render() {
        // 0 search results
        if (this.state.queryStr !== "" && this.state.list.length === 0) {
            return (
                <div className="browse-place">
                    BROWSE PLACE::
                    <AddPlace />
                </div>
            )
        }

        // show a list!
        return (
            <div className="browse-place">
                BROWSE PLACE::
                <InfoList list={this.state.list} />
            </div>
        )
    }  // render


}  // Browse
