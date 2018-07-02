import React from "react";


export class TrainInfoCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: this.props.stationList,
      selectedStation: this.props.station,
      train: this.props.train,
      stopType: this.props.stopType,
      firstStation: '',
      lastStation: '',
      selectedStationStop: '',
      trainName: ''
    };
  }
  componentDidMount() {
    let firstStation = this.stationNameByShortCode(this.state.train.timeTableRows[0].stationShortCode);
    let lastStation = this.stationNameByShortCode(this.state.train.timeTableRows.slice(-1)[0].stationShortCode);
    let trainName = this.state.train.trainType + ' ' + this.state.train.trainNumber;
    let arrivingThisStation = this.state.train.timeTableRows
      .filter(station => station.stationShortCode === this.state.selectedStation.stationShortCode)
      .filter(stop => stop.type === this.state.stopType);
    console.log(trainName,arrivingThisStation[0].scheduledTime);
    let scheduledStop = new Date(arrivingThisStation[0].scheduledTime);
    let hours = scheduledStop.getHours() <= 9 ? '0' + scheduledStop.getHours() : scheduledStop.getHours();
    let minutes = scheduledStop.getMinutes() <= 9 ? '0' + scheduledStop.getMinutes() : scheduledStop.getMinutes();
    this.setState({
      firstStation: firstStation,
      lastStation: lastStation,
      trainName: trainName,
      selectedStationStop: hours + ':' + minutes
    });
  }
  stationNameByShortCode(shortCode) {
    let station = this.state.stationList.filter(station => station.stationShortCode === shortCode)[0];
    if(station) {
      return station.stationName;
    }

  }

  render() {

    if(this.state.train.cancelled) {
      return (
        <tr className='cancelled'>
          <td>{this.state.trainName}</td>
          <td>{this.state.firstStation}</td>
          <td>{this.state.lastStation}</td>
          <td>
            {this.state.selectedStationStop}
            <br/>
            <font color="red">Cancelled</font>
          </td>
        </tr>

      );
    } else{
      return(
        <tr>
          <td>{this.state.trainName}</td>
          <td>{this.state.firstStation}</td>
          <td>{this.state.lastStation}</td>
          <td>{this.state.selectedStationStop}</td>
        </tr>
      );
    }
  }
}