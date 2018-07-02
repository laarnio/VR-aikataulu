import React from "react";
import {Link} from "react-router-dom";

export const NavBar = (props) => {
  return (
    <nav className='navbar container' >
      <div className='container'>
        <div className='navbar-header'>
          <ul className='nav navbar-nav'>
            <li><Link to={'/station/arriving'}>Saapuvat</Link></li>
            <li><Link to={'/station/departing'}>Lähtevät</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};