import React from "react";
import {StationHeader} from "./StationHeader";
import {StationSearchCmp} from "./StationSearchCmp";
import axios from "axios";
import {NavBar} from "./NavBar";
import {ArrivingTrainsPage} from "./ArrivingTrainsPage";

import {
  Route
} from 'react-router-dom'
import {DepartingTrainsPage} from "./DepartingTrainsPage";

export class StationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: [],
      showSearchComp: false,
      labelKeyForSearch: 'stationName',
      selectedStation: '',
      stationTrains: []

    };
    this.setSelectedStation = this.setSelectedStation.bind(this);

  }

  //TODO: filtered result with passenger traffic
  componentWillMount() {
    let url = 'https://rata.digitraffic.fi/api/v1/metadata/stations';
    axios.get(url)
      .then(res => {
        let filteredResult = res.data.filter(station => station.passengerTraffic);

        this.setState({stationList: filteredResult, showSearchComp: true});
        return res;
      })
      .catch(err => console.log(err));

  }

  setSelectedStation(station) {
    this.setState({selectedStation: station});
    let stationShortCode = station.stationShortCode;
    let url = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
      + stationShortCode
      + '?include_nonstopping=false';
    axios.get(url)
      .then(res => {
        console.log(res.data);
        let trains = res.data
          .filter(train => train.runningCurrently)
          .filter(train => train.trainCategory !== 'Cargo');

        this.setState({stationTrains: trains})

      })
      .catch(err => console.log(err));

  }


  render() {
    const departingPage = () => {
      return (
        <DepartingTrainsPage
          stationTrains={this.state.stationTrains}
          stationList={this.state.stationList}
          station = {this.state.selectedStation}
        />
      );
    };
    const arrivingPage = () => {
      return (
        <ArrivingTrainsPage
          stationTrains={this.state.stationTrains}
          stationList={this.state.stationList}
          station = {this.state.selectedStation}
        />
      );
    };
    return (
      <div>
        <div>
          <StationHeader/>
        </div>

        <hr/>

        <div>
          {this.state.showSearchComp ?
            <StationSearchCmp
              labelKey={this.state.labelKeyForSearch}
              stationList={this.state.stationList}
              selectedStation = {this.setSelectedStation}/>
            : 'Loading stations'}
        </div>
          <NavBar/>
        <div>
          <Route path={'/station/arriving'} component={arrivingPage}/>
          <Route path={'/station/departing'} component={departingPage} />
        </div>
      </div>

    );
  }

}
