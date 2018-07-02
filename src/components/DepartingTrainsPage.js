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
    this.filterDepartingTrains = this.filterDepartingTrains.bind(this);
  }
  componentDidMount() {
    this.filterDepartingTrains();
  }

  filterDepartingTrains(){
    let trains = this.props.stationTrains;
    console.log('trainsbeforefilter:', trains);
    trains = trains.filter(train => {
      let acceptableTrain = train.timeTableRows
        .filter(station => station.stationShortCode === this.state.station.stationShortCode)
        .filter(stop => stop.type === 'DEPARTURE');
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
        {this.state.trains.map(train =>
          <TrainInfoCmp key={train.trainNumber} stopType={'DEPARTURE'} station={this.state.station} train={train} stationList={this.state.stationList} />
        )}
      </div>
    );
  }
}