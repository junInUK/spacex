import React, { Component } from "react";
import '../App.css';
import spacex_logo from '../assets/spacex-logo.png';

class TopButton extends Component{
    constructor(props){
        super(props);
        
        this.reLoadData = this.reLoadData.bind(this);
    }

    reLoadData(){
        this.props.pReloadData();
    }

    render(){
        return (
            <div className="row top-button">
                <div className="col-sm-9 col-md-9 col-lg-6">
                    <img src={spacex_logo} width="25%" alt="spacex logo"></img>
                    <span className="text-after-logo">LAUNCHES</span>
                </div>
                <div className="col-sm-9 col-md-9 col-lg-6 text-right">
                    <button className="btn btn-info" onClick={this.reLoadData}>Reload Data <span className="icon-refresh"> </span></button>
                </div>
            </div>
        )
    }
}

export default TopButton;