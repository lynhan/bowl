import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

// my stuff
import AddPlace from './AddPlace'
import AddReview from './AddReview'


export default class AddFood extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            placeID: "",
            reviewID: "",
            file: '',
            imagePreviewUrl: '',
        }
        this.setName = this.setName.bind(this)
        this.submit = this.submit.bind(this)
        this.setName = this.setName.bind(this)
    }


    setName(event) {
        this.setState({ name: event.target.value })
    }

    // adds food key to place's food key array
    // sets place id of food
    push(foodName) {
        var newPostKey = firebase
            .database()
            .ref('food')
            .push()
            .key
        var updates = {}
        updates['/food/' + newPostKey] = foodName
        return firebase.database().ref().update(updates)  // can use in future
    }


    submit(e) {
        e.preventDefault();
        console.log('handle uploading-', this.state.file)
        var storageRef = firebase.storage().ref();
        var ref = storageRef.child(this.state.file.name);
        ref.put(this.state.file).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
        })
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

                <input
                    className="form-control"
                    placeholder="food name"
                    type="text" />

                <div className="">

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
