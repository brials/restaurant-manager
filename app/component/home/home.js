'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const axios = require('axios');
const Redirect = require('react-router').Redirect; //eslint-disable-line

const restApi = require('../../service/restaurant-service');
const employeeApi = require('../../service/employee-service');
const tableApi = require('../../service/table-service');

const Loading = require('../loading.js') //eslint-disable-line
const CreateRestaurant = require('./create-restaurant'); //eslint-disable-line
const CreateEmployee = require('./create-employee'); //eslint-disable-line

require('./_home.scss');

function RestaurantSelect(props){
  return (
    <div className='restaurant-select'>
      <h1> Restaurants </h1>
      {props.children}
      <ul>
        {props.restaurants.map(rest => {
          return (
            <li onClick={props.onSelect.bind(null, rest)}
              style={rest.name === props.selectedRestaurant.name ? { color: '#0cd30d'}: null}
              key={rest.name}>
              <p >{rest.name}</p>
              <p> Tables: {rest.tables.length} </p>
              <p> Employees: {rest.employees.length} </p>
              <button onClick={props.onDelete.bind(null, rest)}>delete</button>
              <button onClick={props.addTable.bind(null, rest)}>Add Table</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

RestaurantSelect.propTypes ={
  selectedRestaurant: PropTypes.object.isRequired,
  restaurants: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  addTable: PropTypes.func.isRequired
};

function EmployeeSelect(props){
  return(
    <div className='employee-select'>
      <h1> Employees </h1>
      <ul>
        {props.employees.map(emp => {
          return (
            <li
            style={emp.name === props.selectedEmployee.name ? { color: '#0cd30d'}: null}
              key={emp.name}>
              <p onClick={props.onSelect.bind(null, emp)}>{emp.name}</p>
              <button onClick={props.onDelete.bind(null, emp)}> delete </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

EmployeeSelect.propTypes = {
  selectedEmployee: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      restaurants: [],
      employees: [],
      activeRestaurant: {},
      activeEmployee: {},
      loading: true,
      viewRestaurant: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmployeeSubmit = this.handleEmployeeSubmit.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.addTableToRestaurant = this.addTableToRestaurant.bind(this);
    this.linkEmployee = this.linkEmployee.bind(this);
    this.inspectActive = this.inspectActive.bind(this);
  }
  componentDidMount(){
    axios.all([
      restApi.fetchRestaurants(),
      employeeApi.fetchEmployees()
    ])
    .then(fetches => {
      console.log('inside did mount', fetches);
      this.setState(() => {
        return {loading: false};
      });
      this.setState(() => {
        if(fetches[0].length){
          return{
            restaurants: fetches[0],
            activeRestaurant: fetches[0][0]
          };
        } else {
          return {
            restaurants: []
          };
        }
      });
      this.setState(() => {
        if(fetches[1].length){
          return{
            employees: fetches[1],
            activeEmployee: fetches[1][0]
          };
        } else {
          return {
            employees: []
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
        return this.state.restaurants.push(restaurant);
      });
    });
  }
  handleEmployeeSubmit(employee){
    employeeApi.postEmployee(employee)
    .then(employee => {
      console.log('employee posted', employee);
      this.setState(() => {
        return this.state.employees.push(employee);
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
  updateEmployee(employee){
    this.setState(() => {
      return {
        activeEmployee: employee
      };
    });
  }
  deleteRestaurant(rest){
    restApi.deleteRestaurant(rest)
    .then(() => {
      return restApi.fetchRestaurants();
    })
    .then(res => {
      this.setState(() => {
        if(res.length === 0) {
          return{
            activeRestaurant: {},
            restaurants: []
          };
        } else {
          return {
            restaurants: res,
            activeRestaurant: res[0]
          };
        }
      });
    });
  }
  deleteEmployee(employee){
    employeeApi.deleteEmployee(employee)
    .then(() => {
      return employeeApi.fetchEmployees();
    })
    .then(res => {
      this.setState(() => {
        if(res.length === 0) {
          return{
            activeEmployee: {},
            employees: []
          };
        } else {
          return {
            employees: res,
            activeEmployee: res[0]
          };
        }
      });
    });
  }
  addTableToRestaurant(rest){
    let activeRest = this.state.activeRestaurant._id;
    let tableNumber = rest.tables.length + 1;
    tableApi.postTable({tableNum: tableNumber}, rest)
    .then(() => {
      return restApi.fetchRestaurants();
    })
    .then(rests => {
      for(let i = 0; i < rests.length; i++){
        if(rests[i]._id == activeRest){
          console.log('active found');
          var newActive = rests[i];
        }
      }
      this.setState(() => {
        return {
          restaurants: rests,
          activeRestaurant: newActive
        };
      });
    });
  }
  linkEmployee(){
    let activeRest = this.state.activeRestaurant._id;
    for(let i = 0; i < this.state.activeRestaurant.employees.length; i++){
      if(this.state.activeEmployee._id == this.state.activeRestaurant.employees[i]._id){
        return 'already exists';
      }
    }
    employeeApi.connectEmployee(this.state.activeRestaurant, this.state.activeEmployee)
    .then(() => {
      return restApi.fetchRestaurants();
    })
    .then(rests => {
      for(let i = 0; i < rests.length; i++){
        if(rests[i]._id == activeRest){
          console.log('active found');
          var newActive = rests[i];
        }
      }
      this.setState(() => {
        return {
          restaurants: rests,
          activeRestaurant: newActive
        };
      });
    });
  }
  inspectActive(){
    this.setState(() => {
      return {viewRestaurant: true};
    });
  }
  render(){
    let destination = '/restaurant/' + this.state.activeRestaurant._id;
    return (
      <div className='home'>
        <h1> Manage Your Restaurants </h1>
        <div className='create'>
          <CreateRestaurant onSubmit={this.handleSubmit} />
          <CreateEmployee onSubmit={this.handleEmployeeSubmit} />
        </div>
        {this.state.loading
          ?<Loading />
          :<div>
            </div>}
        {this.state.restaurants[0] &&
        <RestaurantSelect
          selectedRestaurant={this.state.activeRestaurant}
          onSelect={this.updateRestaurant}
          restaurants={this.state.restaurants}
          onDelete={this.deleteRestaurant}
          addTable={this.addTableToRestaurant}>
          <button onClick={this.inspectActive} className='inspect'> Inspect Active Restaurant </button>
        </RestaurantSelect>}
        {this.state.viewRestaurant &&
          <Redirect to={destination} />}
        {this.state.employees[0] &&
          <EmployeeSelect
            selectedEmployee={this.state.activeEmployee}
            onSelect={this.updateEmployee}
            employees={this.state.employees}
            onDelete={this.deleteEmployee}/>}

        {this.state.employees[0] && this.state.restaurants[0] &&
          <button onClick={this.linkEmployee}> Link Actives </button>}
      </div>
    );
  }
}

module.exports = Home;
