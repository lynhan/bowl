import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

// my stuff
import AddPlace from './AddPlace'
import AddReview from './AddReview'


export default class AddFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foodNameStr: "",
            placeID: "",
            reviewID: "",
            file: '',
            imagePreviewUrl: '',
        }
        this.submit = this.submit.bind(this)
        this.setFoodNameStr = this.setFoodNameStr.bind(this)
    }


    setFoodNameStr(event) {
        this.setState({ foodNameStr: event.target.value })
    }


    submit() {
        // save picture
        let storageRef = firebase.storage().ref();
        let ref = storageRef.child('food/' + this.state.file.name)
        ref.put(this.state.file).then(function (snapshot) {
            console.log('Uploaded' + this.state.file.name)
        })
        
        // save food entry
        // foodNameStr and foodPictureRef
        let newPostKey = firebase
            .database()
            .ref('food')
            .push()
            .key
        let updates = {}
        let foodObj = {
            name: this.state.foodNameStr,
            picture: 'food/' + this.state.file.name
        }
        updates['/food/' + newPostKey] = foodObj
        return firebase.database().ref().update(updates)  // can use in future
    }


    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }


    render() {
        let status
        if (this.state.file) {
            status = (<span> {this.state.file.name} </span>)
        } else {
            status = (<span>no image to upload</span>)
        }
        return (
            <div className="add-food">
                <div className="add-food-name">
                    <input type="text"
                        className="form-control small-right"
                        id="protein"
                        value={this.state.foodNameStr}
                        onChange={this.setFoodNameStr} />
                    <label htmlFor="protein">food name</label>
                </div>
                <div className="add-food-image">
                    <span className="attachBtn mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                        <i className="material-icons">attach_file</i>
                        <input type="file" id="uploadBtn"
                            onChange={(e) => this._handleImageChange(e)} />
                    </span>
                    <span> {status} </span>
                    <input
                        className="mdl-textfield__input upload"
                        placeholder="File"
                        type="text"
                        id="uploadFile"
                        readOnly />
                </div>
                <button
                    type="button"
                    className="mdl-button mdl-js-button mdl-button--raised"
                    onClick={this.submit}>add food</button>
                <AddPlace />  {/* auto saves */}
            </div>
        )
    }
}
