import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import './style.css'


export default class AddReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {},
            picPreviewUrl: "",
            bool: false,
        }
        this.setImage = this.setImage.bind(this)
        this.setBool = this.setBool.bind(this)
        this.submit = this.submit.bind(this)
    }


    setBool(e) {
        this.setState({ bool: e.target.checked })
    }


    setImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                picPreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }


    submit() {
        // save review
        let newReviewKey = firebase
            .database()
            .ref()
            .child('review')
            .push()
            .key
        let newReview = {
            food_id: this.props.food_id,
            bool: this.state.bool
        }
        firebase
            .database()
            .ref('review/' + newReviewKey)
            .set(newReview)

        firebase
            .storage()
            .ref()
            .child('pic/' + newReviewKey)
            .put(this.state.file)
            .then(function(snapshot) {
                console.log('Uploaded' + this.state.file.name)
            })
    }


    render() {
        var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
            let status
            if (this.state.file) {
                status = (<span> {this.state.file.name} </span>)
            } else {
                status = (<span> pick a picture! </span>)
            }

            return (
                <div className="add-review">
                    ADD REVIEW
                    <div className="add-review-pic">
                        <label className="image_input_button mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored">
                            <i className="material-icons">file_upload</i>
                            <input type="file" className="hidden"
                                onChange={(e) => this.setImage(e)} />
                        </label>

                        <span className='upload-status'> omg status: {status} </span>
                        {/* this is hidden :D */}

                        <input
                            className="mdl-textfield__input hidden"
                            placeholder="File"
                            type="text"
                            readOnly />
                    </div>

                    <div className="add-review-bool">
                        <input type="checkbox" id="cbox2" value="second_checkbox" onChange={this.setBool} />
                        <label htmlFor="cbox2">I would get this again</label>
                    </div>
                    <button onClick={this.submit}> submit </button>
                </div>
            )  // end return 
        } else {
            // No user is signed in.
            return (
                <div className="login-btn">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={this.props.handleLogin}>
                        sign in with google to add review
                </button>
                </div>
            )
        }


    }
}
