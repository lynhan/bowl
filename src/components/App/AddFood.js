import React, { Component } from 'react'
import AddPlace from './AddPlace'
import AddReview from './AddReview'

export default class AddFood extends Component {
    render() {
        return (
            <div className="add-food">
                ADD FOOD
                FOOD NAME INPUT
                <AddPlace />
                <AddReview />
            </div>
        )
    }
}
