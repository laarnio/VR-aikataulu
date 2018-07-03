import React from "react";
import {TrainInfoCmp} from "./TrainInfoCmp";


export class TrainsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: this.props.stationList,
      station: this.props.station,
      stopType: this.props.stopType,
      trains: this.props.stationTrains
    };
    this.filterArrivingTrains = this.filterArrivingTrains.bind(this);
    this.compareArrivalTimes = this.compareArrivalTimes.bind(this);
  }

  filterArrivingTrains(trains) {
    return trains.filter(train => train.timeTableRows.some(station => {
      return station.stationShortCode === this.state.station.stationShortCode && station.type === this.state.stopType;
    }));
  }

  compareArrivalTimes(a, b){
    const stationA = a.timeTableRows.find(station => station.stationShortCode === this.state.station.stationShortCode
      && station.type === this.state.stopType);
    const stationB = b.timeTableRows.find(station => station.stationShortCode === this.state.station.stationShortCode
      && station.type === this.state.stopType);

    const timeA = new Date(stationA.liveEstimateTime || stationA.scheduledTime);
    const timeB = new Date(stationB.liveEstimateTime || stationB.scheduledTime);

    return timeA - timeB;
  }

  render() {
    const ArrOrDep = this.state.stopType === 'ARRIVAL' ? <th>Saapuu</th> : <th>Lähtee</th>;
    return (
      <div className='container'>
        <table width='100%'>
          <thead>
          <tr>
            <th>Juna</th>
            <th>Lähtöasema</th>
            <th>Pääteasema</th>
            {ArrOrDep}
          </tr>
          </thead>
          <tbody>
          {this.filterArrivingTrains(this.state.trains).sort(this.compareArrivalTimes).map(train =>
            <TrainInfoCmp key={train.trainNumber} stopType={this.state.stopType} station={this.state.station} train={train} stationList={this.state.stationList} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}