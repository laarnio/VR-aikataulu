import React, { Component } from 'react';
import './App.css';
import {StationPage} from "./components/StationPage"
import {ArrivingTrainsPage} from "./components/ArrivingTrainsPage";
import {DepartingTrainsPage} from "./components/DepartingTrainsPage"
import {
  BrowserRouter as Router,
    Route
} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <StationPage>
              <Route path='/arriving' component={ArrivingTrainsPage}/>
              <Route path='/departing' component={DepartingTrainsPage}/>
            </StationPage>

          </div>
        </Router>

      </div>
    )
  }
}

export default App;
