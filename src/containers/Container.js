import React, { Component } from 'react';
import TopButton from '../components/TopButton';
import LeftLaunch from '../components/LeftLaunch';
import ListBox from '../components/ListBox';

class Container extends Component {
    constructor(props){
        super(props);

        this.state = {
            launchLists: [],
            noRepeatLaunchYears: [],
            filteredYear: 0
        }
        this.reloadData = this.reloadData.bind(this);
        this.selectYear = this.selectYear.bind(this);
        this.descendSort = this.descendSort.bind(this);
    }

    loadData(){
        fetch("https://api.spacexdata.com/v3/launches?id=true")
        .then(res => res.json())
        .then(result => {
            this.setState({launchLists: result});
            let years = [];
            for(let i = 0; i < this.state.launchLists.length; i++){
                console.log(years.indexOf(this.state.launchLists[i].launch_date_utc.substring(0,4)));
                if(years.indexOf(this.state.launchLists[i].launch_date_utc.substring(0,4)) === -1){
                    years.push(this.state.launchLists[i].launch_date_utc.substring(0,4));
                }
            }
            this.setState({noRepeatLaunchYears: years});
        })
        .catch(err => console.log(err)) 
    }

    selectYear(yearSelected){
        console.log("In container, year selected:"+yearSelected);
        let matchedYearLaunchLists = [];
        for(let i = 0; i< this.state.launchLists.length; i++){
            let year = this.state.launchLists[i].launch_date_utc.substring(0,4);
            console.log("launched year:["+ year+"]");
            if(year === yearSelected){
                console.log(year + " == " + yearSelected)
                matchedYearLaunchLists.push(this.state.launchLists[i]);
            }
        }
        console.log("after match:");
        for(let i = 0; i < matchedYearLaunchLists.length; i++){
            console.log(matchedYearLaunchLists[i]);
        }
       
        this.setState({
            launchLists: matchedYearLaunchLists
        });
        
        console.log("In state launch list:");
        for(let i = 0; i<this.state.launchLists.length; i++){
            console.log(this.state.launchLists[i].launch_date_utc);
        }
    }

    descendSort(){
        console.log("In container, descend sort!");
        let tempLaunchLists = [...this.state.launchLists];
        tempLaunchLists.sort(function(a,b){
            let aYear = a.launch_date_utc.substring(0,4);
            let aMonth = a.launch_date_utc.substring(5,7);
            let aDate = a.launch_date_utc.substring(8,10);
            let bYear = b.launch_date_utc.substring(0,4);
            let bMonth = b.launch_date_utc.substring(5,7);
            let bDate = b.launch_date_utc.substring(8,10);
            console.log("a year:"+aYear+ " a month:" + aMonth + " a date:" + aDate +
                       " b year:"+bYear+ " b month:" + bMonth + " b date:" + bDate);
            if(aYear < bYear){
                return 1;
            }else if(aYear > bYear){
                return -1;
            }else{
                if(aMonth < bMonth){
                    return 1;
                }else if(aMonth > bMonth){
                    return -1;
                }else{
                    if(aDate < bDate){
                        return 1;
                    }else if(aDate > bDate){
                        return -1;
                    }else{
                        return 0;
                    }
                }
            }    
        });
        for(let i=0;i<tempLaunchLists.length;i++){
            console.log(tempLaunchLists[i].launch_date_utc);
        }
        this.setState({
            launchLists: tempLaunchLists
        })
    }

    reloadData(){
        console.log("This is reloadData in the container!");
        this.loadData()
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        return (
            <div className="container">
                <TopButton pReloadData={this.reloadData}/>      
                <div className="row">
                    <div className="col-sm-9 col-md-9 col-lg-5">
                        <LeftLaunch />
                    </div>
                    <div className="col-sm-9 col-md-9 col-lg-7 text-right">
                        <ListBox launchLists = {this.state.launchLists}
                        noRepeatLaunchYears = {this.state.noRepeatLaunchYears} 
                        selectYear = {this.selectYear} 
                        descendSort = {this.descendSort} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Container;