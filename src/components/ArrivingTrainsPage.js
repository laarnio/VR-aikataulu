import React from "react";
import {TrainInfoCmp} from "./TrainInfoCmp";


export class ArrivingTrainsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: this.props.stationList,
      station: this.props.station,
      trains: []
    };
    this.filterArrivingTrains = this.filterArrivingTrains.bind(this);
    this.compareArrivingTimes = this.compareArrivingTimes.bind(this);
  }
  componentDidMount() {
    this.filterArrivingTrains();
  }

  filterArrivingTrains(){
    let trains = this.props.stationTrains;
    console.log('trainsbeforefilter:', trains);
    trains = trains
      .filter(train => {
        let acceptableTrain = train.timeTableRows
          .filter(station => station.stationShortCode === this.state.station.stationShortCode)
          .filter(station => station.type === 'ARRIVAL');
        if(acceptableTrain[0]){
          return acceptableTrain[0];
        }
        return null;
    });
    this.setState({trains});
    console.log('trainsAfterFilter', trains);
  }
  compareArrivingTimes(a, b){
    let timeA, timeB = '';
    let stationA = a.timeTableRows.find(station => station.stationShortCode === this.state.station.stationShortCode
      && station.type === 'ARRIVAL');
    let stationB = b.timeTableRows.find(station => station.stationShortCode === this.state.station.stationShortCode
      && station.type === 'ARRIVAL');
    if(stationA.liveEstimateTime) {
      timeA = new Date(stationA.liveEstimateTime);
    } else {
      timeA = new Date(stationA.scheduledTime);
    }
    if(stationB.liveEstimateTime) {
      timeB = new Date(stationB.liveEstimateTime);
    } else {
      timeB = new Date(stationB.scheduledTime);
    }
    return timeA - timeB;
  }

  render() {
    return (
      <div className='container'>
        <table width='100%'>
          <thead>
          <tr>
            <th>Juna</th>
            <th>Lähtöasema</th>
            <th>Pääteasema</th>
            <th>Saapuu</th>
          </tr>
          </thead>
          <tbody>
          {this.state.trains.sort(this.compareArrivingTimes).map(train =>
            <TrainInfoCmp key={train.trainNumber} stopType={'ARRIVAL'} station={this.state.station} train={train} stationList={this.state.stationList} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}