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
  }
  componentDidMount() {
    this.filterArrivingTrains();
  }

  filterArrivingTrains(){
    let trains = this.props.stationTrains;
    console.log('trainsbeforefilter:', trains);
    trains = trains.filter(train => {
      let acceptableTrain = train.timeTableRows
        .filter(station => station.stationShortCode === this.state.station.stationShortCode)
        .filter(stop => stop.type === 'ARRIVAL');
      if(acceptableTrain[0]){
        return acceptableTrain[0];
      }
    });
    this.setState({trains});
    console.log('trainsAfterFilter', trains);
  }

  render() {
    return (
      <div className='container'>
        <p>OLA</p>
        <table width="100%">
          <thead>
          <tr>
            <th>Juna</th>
            <th>Lähtöasema</th>
            <th>Pääteasema</th>
            <th>Saapuu</th>
          </tr>
          </thead>
          <tbody>
          {this.state.trains.map(train =>
            <TrainInfoCmp key={train.trainNumber} stopType={'ARRIVAL'} station={this.state.station} train={train} stationList={this.state.stationList} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}