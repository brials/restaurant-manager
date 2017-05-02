'use strict';

const React = require('react');
const NavLink = require('react-router-dom').NavLink; //eslint-disable-line
const Redirect = require('react-router').Redirect //eslint-disable-line

require('./_nav.scss');

class Nav extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      loggingOut: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    localStorage.removeItem('token'); //eslint-disable-line
    this.setState(() => {
      return {loggingOut: true};
    });
  }
  render(){
    return(
      <div className='nav-bar'>
        <ul className='nav-list'>
          <li>
            <NavLink exact activeClassName='active' to='/'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName='active' to='/restaurant'>
              Restaurant
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName='active' to='/about'>
              About
            </NavLink>
          </li>
        </ul>
        <button className='btn-std' onClick={this.handleLogout}>
        Logout
        </button>
        {this.state.loggingOut &&
          <Redirect to='/login'/>}
      </div>
    );
  }
}

module.exports = Nav;
