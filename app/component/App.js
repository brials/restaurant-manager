'use strict';

const React = require('react');
const Redirect = require('react-router').Redirect
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;//eslint-disable-line
const Route = ReactRouter.Route; //eslint-disable-line
const Switch = ReactRouter.Switch; //eslint-disable-line
const Landing = require('./landing/landing'); //eslint-disable-line

console.log(ReactRouter);


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  render(){
    return (
      <Router>
        <div className='container'>
            {!this.state.loggedIn &&
              <Redirect to='/login'/>}
            <Route path='/login' component={Landing}/>
            <Route render={function() {
              return <p>Not Found</p>;
            }} />
        </div>
      </Router>
    );
  }
}

module.exports = App;
