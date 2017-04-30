const React = require('react');
const ReactRouter = require('react-router-dom');
const Router = ReactRouter.BrowserRouter;//eslint-disable-line
const Route = ReactRouter.Route; //eslint-disable-line
const Switch = ReactRouter.Switch; //eslint-disable-line


class App extends React.Component {
  render(){
    return (
      <Router>
        <div className='container'>
          <Switch>
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
