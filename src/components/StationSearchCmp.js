import React from "react";
import Select from 'react-select'
import 'react-select/dist/react-select.css';


export class StationSearchCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationList: this.props.stationList,
      labelKey: this.props.labelKey,
      selectedOption: ''
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    if (selectedOption) {
      this.props.selectedStation(selectedOption);
      console.log('Selected:', selectedOption);
    }
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <b> Hae aseman nimellä:</b>
        <Select
          options={this.state.stationList}
          labelKey={this.state.labelKey}
          value={selectedOption}
          onChange={this.handleChange}
          placeholder="Valitse asema"/>
      </div>
    )
    ;
  }
}
