'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const restApi = require('../../service/restaurant-service');
const employeeApi = require('../../service/employee-service');
const Loading = require('../loading.js') //eslint-disable-line
const axios = require('axios');
const CreateRestaurant = require('./create-restaurant'); //eslint-disable-line
const CreateEmployee = require('./create-employee'); //eslint-disable-line


function RestaurantSelect(props){
  return (
    <ul>
      {props.restaurants.map(rest => {
        return (
          <li
            style={rest.name === props.selectedRestaurant.name ? { color: '#348921'}: null}
            onClick={props.onSelect.bind(null, rest)}
            key={rest.name}>
            {rest.name}
          </li>
        );
      })}
    </ul>
  );
}

RestaurantSelect.propTypes ={
  selectedRestaurant: PropTypes.object.isRequired,
  restaurants: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      restaurants: null,
      employees: null,
      activeRestaurant: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmployeeSubmit = this.handleEmployeeSubmit.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
  }
  //TODO employeeApi.fetchEmployees()
  componentDidMount(){
    axios.all([
      restApi.fetchRestaurants(),
    ])
    .then(rests => {
      console.log('inside did mount', rests);
      this.setState(() => {
        if(rests[0].length){
          return{
            restaurants: rests[0],
            activeRestaurant: rests[0][0]
          };
        } else {
          return {
            restaurants: null
          };
        }
      });
    });
  }
  handleSubmit(restaurant){
    restApi.postRestaurant(restaurant)
    .then(restaurant => {
      console.log('restaurant posted', restaurant);
      this.setState(() => {
        if(this.state.restaurants === null){
          return [restaurant];
        } else {
          return this.state.restaurants.push(restaurant);
        }
      });
    });
  }
  handleEmployeeSubmit(employee){
    employeeApi.postEmployee(employee)
    .then(employee => {
      console.log('employee posted', employee);
      this.setState(() => {
        if(this.state.employees === null){
          return { employees: [employee]};
        } else {
          return this.state.employees.push(employee);
        }
      });
    });
  }
  updateRestaurant(rest){
    this.setState(() => {
      return {
        activeRestaurant: rest
      };
    });
  }
  render(){
    return (
      <div>
        <h1> Manage Your Restaurants </h1>
        <CreateRestaurant onSubmit={this.handleSubmit} />
        <CreateEmployee onSubmit={this.handleEmployeeSubmit} />
        {!this.state.restaurants || !this.state.employees
          ?<Loading />
          :<div>
            </div>}
        {this.state.restaurants &&
        <RestaurantSelect selectedRestaurant={this.state.activeRestaurant} onSelect={this.updateRestaurant} restaurants={this.state.restaurants} />}
      </div>
    );
  }
}

module.exports = Home;
