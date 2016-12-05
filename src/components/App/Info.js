import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

export default class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pictureUrlStr: ""
        }
    }


    componentDidMount() {
        let this_ = this
        let storageRef = firebase.storage().ref();
        let ref = storageRef.child(this.props.data.picture);
        ref.getDownloadURL().then(function (url) {
            console.log("URL", url)
            this_.setState({ pictureUrlStr: url })
        }).catch(function (error) {
            switch (error.code) {
                case 'storage/object_not_found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }


    render() {
        console.log('INFO ', this.props.data)
        return (
            <div className="info">
                <div className="info-name">
                    {this.props.data.name}
                </div>
                <div className="info-picture">
                    <img src={this.state.pictureUrlStr}
                    alt="loading pic..."
                    width="200px"/>
                </div>
            </div>
        )
    }
}
