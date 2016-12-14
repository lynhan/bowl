import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import { Link } from 'react-router'

export default class Review extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pictureUrlStr: ""
        }
        this.getPictureDownloadUrl = this.getPictureDownloadUrl.bind(this)
    }


    componentDidMount() {
        this.getPictureDownloadUrl()
    } // end componentDidMount


    getPictureDownloadUrl() {
        let this_ = this
        let storageRef = firebase.storage().ref();
        let ref = storageRef.child('pic/' + this.props.data.id);
        console.log('getting ref at' + 'pic/' + this.props.data.id)
        ref.getDownloadURL()
            .then(function (url) {
                this_.setState({ pictureUrlStr: url })
            })
            .catch(function (error) {
                switch (error.code) {
                    case 'storage/object_not_found':
                        console.log("File doesn't exist")
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
                    default:
                        console.log("omg")
                }
            }) // end catch
    } // getPictureDownloadUrl


    render() {
        let picture
        if (this.state.pictureUrlStr) {
            picture = (
                <div className="review-picture">
                    <img src={this.state.pictureUrlStr}
                        alt="loading pic..."
                        className="image" />
                </div>
            )
        }

        let bool
        if (this.props.data.bool) {
            bool = (<div> loved it </div>)
        } else {
            bool = (<div> hated it </div>)
        }
        return (
            <div className="info">
                {picture}
                {bool}
            </div>
        )
    }
}
