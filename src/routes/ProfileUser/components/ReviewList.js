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
                this_.setState({
                    reviews: array.filter(function (item) {
                        return item.userId === firebase.auth().currentUser.uid
                    }),
                })
            } else {
                this_.setState({ data: [] })
            }
        })
    }

    render() {
        let summary
        let list
        if (this.state.reviews && this.state.reviews.length > 0) {
            summary = (
                <div> {this.state.reviews.length} snaps</div>
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
                <div>No snaps yet :)</div>
            )
        }
        return (
            <div className="review-list section">
                {list}
            </div>
        )
    }
}

module.exports = ReviewList