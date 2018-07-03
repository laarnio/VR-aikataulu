import React from "react";
import {TrainInfoCmp} from "./TrainInfoCmp";


export class DepartingTrainsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: this.props.stationList,
      station: this.props.station,
      trains: []
    };
    this.filterDepartureTimes = this.filterDepartureTimes.bind(this);
    this.compareDepartureTimes = this.compareDepartureTimes.bind(this);
  }
  componentDidMount() {
    this.filterDepartureTimes();
  }

  filterDepartureTimes(){
    let trains = this.props.stationTrains;
    console.log('trainsbeforefilter:', trains);
    trains = trains
      .filter(train => {
        let acceptableTrain = train.timeTableRows
          .filter(station => station.stationShortCode === this.state.station.stationShortCode)
          .filter(station => station.type === 'DEPARTURE');
        if(acceptableTrain[0]){
          return acceptableTrain[0];
        }
        return null;
      });
    this.setState({trains});
    console.log('trainsAfterFilter', trains);
  }
  compareDepartureTimes(a, b){
    let timeA, timeB = '';
    let stationA = a.timeTableRows.find(station => station.stationShortCode === this.state.station.stationShortCode
      && station.type === 'DEPARTURE');
    let stationB = b.timeTableRows.find(station => station.stationShortCode === this.state.station.stationShortCode
      && station.type === 'DEPARTURE');

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
    return timeA-timeB;
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
            <th>Lähtee</th>
          </tr>
          </thead>
          <tbody>
          {this.state.trains.sort(this.compareDepartureTimes).map(train =>
            <TrainInfoCmp key={train.trainNumber} stopType={'DEPARTURE'} station={this.state.station} train={train} stationList={this.state.stationList} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}