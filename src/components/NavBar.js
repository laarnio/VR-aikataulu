import React from 'react';
import {Link} from 'react-router-dom';

export const NavBar = (props) => {
  const arriving = props.activePage === '/station/arriving'
    ? <li className="active"><Link to={"/station/arriving"}>Saapuvat</Link></li>
    : <li><Link to={"/station/arriving"}>Saapuvat</Link></li>;

  const departing = props.activePage === '/station/departing'
    ? <li className = "active"><Link to={"/station/departing"}>Lähtevät</Link></li>
    : <li><Link to={"/station/departing"}>Lähtevät</Link></li>;

  return (
    <nav className="navbar container" >
      <div className="container">
        <div className="navbar-header">
          <ul className="nav navbar-nav">
            {arriving}
            {departing}
          </ul>
        </div>
      </div>
    </nav>
  );
};