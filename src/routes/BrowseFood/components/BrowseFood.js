import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import FoodList from '../../../container/FoodList'

class BrowseFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.observeFood = this.observeFood.bind(this)
        this.setSearchStr = this.setSearchStr.bind(this)
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
                this_.setState({
                    data: array,
                    filtered: array
                })
            } else {
                this_.setState({ data: [] })
            }
        })
    }


    setSearchStr(event) {
        let str = event.target.value
        this.setState({
            filtered: this.state.data.filter(function(item) {
                return item.name.includes(str)
            })
        })
    }


    render() {
        return (
            <div className="browse-food">
                <input type="text"
                    className="browse-food-search form-control"
                    id="searchStr"
                    placeholder="search food"
                    onChange={this.setSearchStr} />
                <FoodList data={this.state.filtered} />
            </div>
        )
    }  // render
}  // BrowseFood

module.exports = BrowseFood