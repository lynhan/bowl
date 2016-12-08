import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'

export default class Info extends Component {
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
        if (this.props.data.picture) {
            let storageRef = firebase.storage().ref();
            let ref = storageRef.child(this.props.data.picture);
            ref.getDownloadURL()
            .then(function (url) {
                this_.setState({ pictureUrlStr: url })
            })
            .catch(function (error) {
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
                    default:
                        console.log("omg")
                }
            }) // end catch
        }  // end if
    } // getPictureDownloadUrl


    render() {
        console.log('INFO ', this.props.data)

        let picture 
        if (this.state.pictureUrlStr) {
            picture = (
                <div className="info-picture">
                    <img src={this.state.pictureUrlStr}
                    alt="loading pic..."
                    width="200px"/>
                </div>
            )
        }

        let name
        if (this.props.data.name) {
            name = (
                <div className="info-name">
                    {this.props.data.name}
                </div>
            )
        }

        let summary
        if (this.props.data.summary) {
            summary = (
                <div className="info-summary">
                    {this.props.data.summary}
                </div>
            )
        }
        return (
            <div className="info">
                {picture}
                {name}
                {summary}
            </div>
        )
    }
}
