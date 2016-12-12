import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

export default class ReviewList extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.observeReviews = this.observeReviews.bind(this)
    }


    componentDidMount() {
        this.observeReviews()
    }


    observeReviews() {
        let this_ = this
        let ref = firebase
            .database()
            .ref('review/')
        ref.on('value', function (snapshot) {
            var data = snapshot.val()
            if (data != null) {
                var array = Object.keys(data)
                    .map(key => Object.assign({}, data[key], { 'id': key }))
                array.reverse()
                this_.setState({
                    reviews: array.filter(function (item) {
                        return item.food_id === this_.props.food_id
                    }),
                })
                console.log("state", this_.state)
            } else {
                this_.setState({ data: [] })
            }
        })
    }

    render() {
        let summary
        if (this.state.reviews && this.state.reviews.length > 0) {
            let percent = (this.state.reviews.filter(function (item) {
                return item.bool === true
            }).length / this.state.reviews.length) * 100
            let prettyPercent = percent.toFixed(2)
            summary = (
                <div> {prettyPercent}% loved it </div>
            )
        } else {
            summary = (
                <div>No reviews so far :)</div>
            )
        }
        return (
            <div className="review-list">
                REVIEWS
                {summary}
            </div>
        )
    }
}
