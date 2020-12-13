import React, { Component } from "react";
import '../App.css';

class LaunchDetail extends Component {

    translateMonth(monthNumber){
        if(monthNumber.substring(0,1) === '0'){
            monthNumber = monthNumber.substring(1,2);
        }
        let monthTranslate = new Map();
        monthTranslate.set("1","Jan");
        monthTranslate.set("2","Feb");
        monthTranslate.set("3","Mar");
        monthTranslate.set("4","Apr");
        monthTranslate.set("5","May");
        monthTranslate.set("6","Jun");
        monthTranslate.set("7","Jul");
        monthTranslate.set("8","Aug");
        monthTranslate.set("9","Sep");
        monthTranslate.set("10","Oct");
        monthTranslate.set("11","Nov");
        monthTranslate.set("12","Dec");
        return monthTranslate.get(monthNumber);
    }

    transLaunchDate(launchDate){
        let year = launchDate.substring(0,4);
        let month = launchDate.substring(5,7);
        let monthTrans = this.translateMonth(month);
        let date = launchDate.substring(8,10)+"th";
        return date+" " + monthTrans + " " + year;
    }

    render(){
        return (
            <div className="row list-item">
                <div className="col-number">#{this.props.flightNumber}</div>
                <div className="col-name">{this.props.missionName}</div>
                <div className="col-date">
                    <div className="upper">
                        {this.transLaunchDate(this.props.launchDateUTC)}
                    </div>
                    <div className="lower">
                        {this.props.rocketName}
                    </div>
                </div>
            </div>
        );
    }
}

export default LaunchDetail;