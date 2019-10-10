import React, { Component } from 'react';
import './Home.css';
import Splash from './splash.jpg';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="splash">
                <img src={Splash}/>
            </div>
        );
    }
}