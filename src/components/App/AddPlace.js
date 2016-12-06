import React, { Component } from 'react'
import { mapApiKey } from '../../config'

export default class AddPlace extends Component {
    componentDidMount() {
        const script = document.createElement("script")
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + mapApiKey + "&libraries=places&callback=initAutoComplete"
        script.async = false
        document.body.appendChild(script)
    }

    render() {
        return (
            <div className="add-place">
                <input id="pac-input" className="controls" type="text" placeholder="Search Box" />
                <div id="map"></div>
            </div>
        )
    }
}
