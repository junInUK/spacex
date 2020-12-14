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
                if(years.indexOf(this.state.launchLists[i].launch_date_utc.substring(0,4)) === -1){
                    years.push(this.state.launchLists[i].launch_date_utc.substring(0,4));
                }
            }
            this.setState({noRepeatLaunchYears: years});
        })
        .catch(err => console.log(err)) 
    }

    selectYear(yearSelected){
        let matchedYearLaunchLists = [];
        for(let i = 0; i< this.state.launchLists.length; i++){
            let year = this.state.launchLists[i].launch_date_utc.substring(0,4);
            if(year === yearSelected){
                matchedYearLaunchLists.push(this.state.launchLists[i]);
            }
        }
        
        this.setState({
            launchLists: matchedYearLaunchLists
        });
    }

    descendSort(){
        let tempLaunchLists = [...this.state.launchLists];
        tempLaunchLists.sort(function(a,b){
            let aYear = a.launch_date_utc.substring(0,4);
            let aMonth = a.launch_date_utc.substring(5,7);
            let aDate = a.launch_date_utc.substring(8,10);
            let bYear = b.launch_date_utc.substring(0,4);
            let bMonth = b.launch_date_utc.substring(5,7);
            let bDate = b.launch_date_utc.substring(8,10);
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
        this.setState({
            launchLists: tempLaunchLists
        })
    }

    reloadData(){
        this.loadData();
    }

    componentDidMount() {
        this.loadData();
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