import React, { Component } from 'react'

export default class AddReview extends Component {


    setImage(e) {
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

    setReview(picFile, bool) {
        this.setState({
            picFile: picFile,
            bool: bool
        })
    }


    // addReview() {
    //     // save review pic
    //     firebase
    //         .storage()
    //         .ref('pic/' + GOOGLE_PLACE_ID + '/' + FOOD_ID)
    //         .push()
    //         .put(this.state.file)
    //         .then(function (snapshot) {
    //             console.log('Uploaded' + FILE_NAME)
    //         })
    //     // save review
    //     let newReviewKey = firebase
    //         .database()
    //         .ref('review')
    //         .push()
    //         .key
    //     let newReview = {
    //         user_id: firebase.auth().currentUser.uid,
    //         food_id: FOOD_ID,
    //         bool: REVIEW_BOOL,
    //         pic_url: 'pic/' + GOOGLE_PLACE_ID + '/' + FOOD_ID,
    //     }
    //     firebase.database().ref().update(updates).then(function () {
    //         console.log("added review")
    //     })
    // }


    render() {
        let status
        if (this.state.file) {
            status = (<span> {this.state.file.name} </span>)
        } else {
            status = (<span> pick a picture! </span>)
        }
        return (
            <div className="add-review">
                <div className="add-review-image">
                    <span className="attachBtn mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                        <i className="material-icons">attach_file</i>
                        <input type="file" id="uploadBtn"
                            onChange={(e) => this.setImage(e)} />
                    </span>
                    <span> {status} </span>
                    {/* this is hidden :D */}
                    <input
                        className="mdl-textfield__input upload"
                        placeholder="File"
                        type="text"
                        id="uploadFile"
                        readOnly />
                </div>
            </div>
        )
    }
}
