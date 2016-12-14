import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import Review from '../../../container/Review'

class ReviewList extends Component {

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
                if (this_.props.foodId) {
                    this_.setState({
                        reviews: array.filter(function (item) {
                            return item.foodId === this_.props.foodId
                        }),
                    })
                } else if (this_.props.userId) {
                    this_.setState({
                        reviews: array.filter(function (item) {
                            return item.userId === this_.props.userId
                        }),
                    })
                }
                console.log("state", this_.state)
            } else {
                this_.setState({ data: [] })
            }
        })
    }

    render() {
        let summary
        let list
        if (this.state.reviews && this.state.reviews.length > 0) {
            let percent = (this.state.reviews.filter(function (item) {
                return item.bool === true
            }).length / this.state.reviews.length) * 100
            let prettyPercent = percent.toFixed(2)
            summary = (
                <div> {prettyPercent}% loved it </div>
            )
            list = this.state.reviews.map(function (item, index) {
                return (
                    <div key={index}>
                        <Review data={item} />
                    </div>
                )
            })
        } else {
            summary = (
                <div>No reviews so far :)</div>
            )
        }
        return (
            <div className="review-list">
                {list}
            </div>
        )
    }
}

module.exports = ReviewList