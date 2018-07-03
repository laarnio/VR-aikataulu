import React from 'react';


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
      scheduledStop: '',
      estimatedStop: '',
      trainName: ''
    };
  }

  componentDidMount() {
    const firstStation = this.stationNameByShortCode(this.state.train.timeTableRows[0].stationShortCode);
    const lastStation = this.stationNameByShortCode(this.state.train.timeTableRows.slice(-1)[0].stationShortCode);
    const trainName = this.state.train.trainType + ' ' + this.state.train.trainNumber;

    const arrivingThisStation = this.state.train.timeTableRows
      .filter(station => station.stationShortCode === this.state.selectedStation.stationShortCode)
      .filter(stop => stop.type === this.state.stopType);

    const scheduledStop = arrivingThisStation[0].scheduledTime;
    const estimatedStop = arrivingThisStation[0].liveEstimateTime;

    this.setState({
      firstStation: firstStation,
      lastStation: lastStation,
      trainName: trainName,
      scheduledStop: scheduledStop,
      estimatedStop: estimatedStop
    });
  }

  stationNameByShortCode(shortCode) {
    const station = this.state.stationList.filter(station => station.stationShortCode === shortCode)[0];
    if(station) {
      return station.stationName;
    }
  }

  render() {
    const estimatedStop = new Date(this.state.estimatedStop);
    const scheduledStop = new Date(this.state.scheduledStop);

    const eHours = estimatedStop.getHours() <= 9 ? '0' + estimatedStop.getHours() : estimatedStop.getHours();
    const eMinutes = estimatedStop.getMinutes() <= 9 ? '0' + estimatedStop.getMinutes() : estimatedStop.getMinutes();
    const sHours = scheduledStop.getHours() <= 9 ? '0' + scheduledStop.getHours() : scheduledStop.getHours();
    const sMinutes = scheduledStop.getMinutes() <= 9 ? '0' + scheduledStop.getMinutes() : scheduledStop.getMinutes();

    const scheduledStopTime = sHours + ':' + sMinutes;
    const estimatedStopTime = eHours + ':' + eMinutes;

    const Cancelled = () => {
      return (
        <tr className="cancelled">
          <td>{this.state.trainName}</td>
          <td>{this.state.firstStation}</td>
          <td>{this.state.lastStation}</td>
          <td>
            {scheduledStopTime}
            <br/>
            <span className="hilight">Cancelled</span>
          </td>
        </tr>
      );
    };
    const OnTime = () => {
      return(
        <tr>
          <td>{this.state.trainName}</td>
          <td>{this.state.firstStation}</td>
          <td>{this.state.lastStation}</td>
          <td>{scheduledStopTime}</td>
        </tr>
      );
    };
    const LateOrEarly = () => {
      return (
        <tr>
          <td>{this.state.trainName}</td>
          <td>{this.state.firstStation}</td>
          <td>{this.state.lastStation}</td>
          <td>
            <span className="hilight">{estimatedStopTime}</span>
            <br/>
            ({scheduledStopTime})
          </td>
        </tr>
      );
    };
    if (this.state.train.cancelled) {
      return (<Cancelled/>);
    } else if (this.state.estimatedStop && estimatedStopTime !== scheduledStopTime) {
      return (<LateOrEarly/>);
    } else {
      return (<OnTime/>);
    }
  }
}