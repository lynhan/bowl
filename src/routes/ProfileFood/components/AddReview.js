import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import './style.css'


export default class AddReview extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.setImage = this.setImage.bind(this)
        this.setBool = this.setBool.bind(this)
        this.submit = this.submit.bind(this)
    }


    componentDidMount() {
        let this_ = this
        firebase.auth().onAuthStateChanged(function (user) {
            console.log("AddFood user is now:", user)
            if (user != null) {
                this_.setState({
                    user: {
                        name: user.displayName,
                        email: user.email,
                        id: user.uid
                    }
                })
            } else {
                this_.setState({
                    user: {},
                    reviews: [],
                })
            }
        });
    }


    setBool(e) {
        this.setState({ bool: e.target.checked })
    }


    setImage(e) {
        let this_ = this
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this_.setState({
                file: file,
                picPreviewUrl: reader.result
            });
            this_.render()
        }
        reader.readAsDataURL(file)
    }


    submit() {
        let this_ = this
        // save review
        let newReviewKey = firebase
            .database()
            .ref()
            .child('review')
            .push()
            .key
        let newReview = {
            foodId: this.props.foodId,
            bool: this.state.bool,
            userId: this.state.user.id,
            url: 'pic/' + newReviewKey,
        }
        firebase
            .database()
            .ref('review/' + newReviewKey)
            .set(newReview)

        // update love for food 
        let ref = firebase
            .database()
            .ref('food/' + this.props.foodId)

        ref.once('value', function (snapshot) {
            var data = snapshot.val()
            if (data != null) {
                let newFood = data
                if (this_.state.bool) {
                    newFood['love'] += 1
                } else {
                    newFood['hate'] += 1
                }
                ref.set(newFood)
            } else {
                console.log("no food data in food/addreview")
            }
        })

        firebase
            .storage()
            .ref()
            .child('pic/' + newReviewKey)
            .put(this.state.file)
            .then(function (snapshot) {
                console.log('Uploaded' + this.state.file.name)
            })
    }


    render() {
        var user = firebase.auth().currentUser

        if (user) {
            // User is signed in.
            let status
            if (this.state.file) {
                status = (<span> {this.state.file.name} </span>)
            } else {
                status = (<span> upload a picture </span>)
            }

            return (
                <div className="add-review">
                    Tried this? Add a review

                    <div className="add-review-bool">
                        <input type="checkbox" id="cbox2" value="second_checkbox" onChange={this.setBool} />
                        <label htmlFor="cbox2">I would get this again</label>
                    </div>

                    <div className="add-review-pic">
                        <label className="image_input_button mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect">
                            <i className="material-icons">file_upload</i>
                            <input type="file" className="hidden"
                                onChange={(e) => this.setImage(e)} />
                        </label>
                        <span className='upload-status'> {status} </span>
                        {/* below input is hidden :D */}
                        <input 
                            className="mdl-textfield__input hidden"
                            placeholder="File"
                            type="text"
                            readOnly />
                    </div>

                    <button
                        className="btn btn-default"
                        onClick={this.submit}> submit </button>
                </div>
            )  // end return 
        } else {
            // No user is signed in.
            return (
                <div className="login-btn">
                    <button
                        type="button"
                        className="btn btn-default"
                        onClick={this.props.handleLogin}>
                        sign in with google to add review
                </button>
                </div>
            )
        }


    }
}
