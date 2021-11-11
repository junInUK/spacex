import React from "react";
import launch_home from '../assets/img/launch-home.png';
import '../App.css';

const LeftLaunch = () => {
    return (
        <div className="row left-launch">
            <img src={launch_home} width="100%" alt="launch home"></img>
        </div>
    )
}

export default LeftLaunch;