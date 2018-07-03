import React from "react";
import {StationHeader} from "./StationHeader";
import {StationSearchCmp} from "./StationSearchCmp";
import axios from "axios";
import {NavBar} from "./NavBar";
import {TrainsPage} from "./TrainsPage";

import {
  Route
} from 'react-router-dom'


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

  componentDidMount() {
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
      + '?minutes_before_departure=120'
      + '&minutes_after_departure=0'
      + '&minutes_before_arrival=120'
      + '&minutes_after_arrival=0';
    axios.get(url)
      .then(res => {
        console.log('tämä saatiin:',res.data);
        let trains = res.data
          .filter(train =>
            train.trainCategory !== 'Cargo'
            && train.trainCategory !== 'Locomotive'
            && train.trainCategory !== 'Shunting');
        console.log('tämä jäi:', trains);
        this.setState({stationTrains: trains})
      })
      .catch(err => console.log(err));
  }

  render() {
    const departingPage = () => {
      return (
        <TrainsPage
          stationTrains={this.state.stationTrains}
          stationList={this.state.stationList}
          station = {this.state.selectedStation}
          stopType = 'DEPARTURE'
        />
      );
    };
    const arrivingPage = () => {
      return (
        <TrainsPage
          stationTrains={this.state.stationTrains}
          stationList={this.state.stationList}
          station = {this.state.selectedStation}
          stopType = 'ARRIVAL'
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
        <div>
          <NavBar/>
          <Route path={'/station/arriving'} component={arrivingPage}/>
          <Route path={'/station/departing'} component={departingPage} />
        </div>
      </div>
    );
  }
}
