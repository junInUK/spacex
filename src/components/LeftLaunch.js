import React, { Component } from "react";
import launch_home from '../assets/img/launch-home.png';
import '../App.css';

class LeftLaunch extends Component{
    render(){
        return (
            <div className="row left-launch">
                <img src={launch_home} width="100%" alt="launch home"></img>
            </div>
        )
    }
}

export default LeftLaunch;