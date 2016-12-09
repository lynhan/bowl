import React, { Component } from 'react'
import * as firebase from 'firebase/firebase-browser'
import './style.css'


export default class AddReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: {}, 
            picPreviewUrl: "",
        }
        this.setImage = this.setImage.bind(this)
        this.setBool = this.setBool.bind(this)
        this.submit = this.submit.bind(this)
    }


    setBool(e) {
        debugger
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
        let food_id = this.props.params.id
        let newReviewKey = firebase
            .database()
            .ref('review')
            .push()
            .key
        let newReview = {
            food_id: food_id,
            bool: this.state.bool
        }
        firebase
            .database()
            .ref('review/' + newReviewKey)
            .set(newReview)
            .then(function(stuff) {
                console.log("yay done saving review ", stuff)
            })
        // save review pic
        firebase
            .storage()
            .ref('pic/' + newReviewKey)
            .push()
            .put(this.state.file)
            .then(function (snapshot) {
                console.log('Uploaded' + this.state.file.name)
            })
    }


    render() {
        let status
        if (this.state.file) {
            status = (<span> {this.state.file.name} </span>)
        } else {
            status = (<span> pick a picture! </span>)
        }

        return (
            <div className="add-review">
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
                    <input type="checkbox" id="cbox2" value="second_checkbox" onChange={this.setBool}/>
                    <label htmlFor="cbox2">I would get this again</label>
                </div>
                 <button onClick={this.submit}> submit </button>
            </div>
        )
    }
}
