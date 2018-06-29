import React from "react";
import {StationHeader} from "./StationHeader";
import {StationSearchCmp} from "./StationSearchCmp";
import axios from "axios";
import {NavBar} from "./NavBar";

export class StationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      showSearchComp: false,
      labelKeyForSearch: 'stationName',
      selectedStation: ''

    };
    this.setSelectedStation = this.setSelectedStation.bind(this);

  }

  //TODO: filtered result with passenger traffic
  componentWillMount() {
    axios.get('https://rata.digitraffic.fi/api/v1/metadata/stations')
      .then(res => {
        let filteredResult = res.data.filter(station => station.passengerTraffic);
        this.setState({list: filteredResult, showSearchComp: true});

        return res;
      })
      .catch(err => console.log(err));
  }

  setSelectedStation(station) {
    this.setState({selectedStation: station});
  }


  render() {
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
              list={this.state.list}
              selectedStation = {this.setSelectedStation}/>
            : 'Loading stations'}
        </div>
          <NavBar/>
        <div>
          {this.props.children}
        </div>
      </div>

    );
  }

}
