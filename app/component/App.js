'use strict';

const React = require('react');
const Redirect = require('react-router').Redirect; //eslint-disable-line
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;//eslint-disable-line
const Route = ReactRouter.Route; //eslint-disable-line
const Switch = ReactRouter.Switch; //eslint-disable-line
const Link = require('react-router-dom').Link; //eslint-disable-line
const Landing = require('./landing/landing'); //eslint-disable-line
const Nav = require('./nav/nav'); //eslint-disable-line
const Home = require('./home/home'); //eslint-disable-line
const RestaurantView = require('./restaurant/restaurant-view'); //eslint-disable-line
const TableView = require('./table/table-view.js');

console.log(ReactRouter);


class App extends React.Component {
  render(){
    return (
      <Router>
        <div className='container'>
        <Nav />
        {!localStorage.token && //eslint-disable-line
          <Redirect to='/login'/>}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/home' component={Home} />
            <Route path='/login' component={Landing} />
            <Route path='/restaurant/:restaurantId' component={RestaurantView} />
            <Route path='/table/:tableId' component={TableView} />
            <Route render={function() {
              return <p>Not Found</p>;
            }} />
          </Switch>
          </div>
      </Router>
    );
  }
}

module.exports = App;
