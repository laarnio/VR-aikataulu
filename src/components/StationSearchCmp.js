import React from "react";
import Select from 'react-select'
import 'react-select/dist/react-select.css';


export class StationSearchCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      labelKey: '',
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
  componentDidMount() {
    this.setState({list: this.props.list, labelKey:this.props.labelKey})
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="container">
        <b> Hae aseman nimellä:</b>
        <Select
          options={this.state.list}
          labelKey={this.state.labelKey}
          value={selectedOption}
          onChange={this.handleChange}
          placeholder="Valitse asema"/>
      </div>
    )
    ;
  }

}
