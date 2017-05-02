'use strict';
const React = require('react');
var PropTypes = require('prop-types');
const restApi = require('../../service/restaurant-service');
//TODO const employeeApi = require('../../service/employee-service');
const Loading = require('../loading.js') //eslint-disable-line
const axios = require('axios');

class CreateRestaurant extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      storeHours: '',
      location: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleStoreHoursChange = this.handleStoreHoursChange.bind(this);
    this.handleCreateRestaurant = this.handleCreateRestaurant.bind(this);
  }
  handleNameChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        name: value,
      };
    });
  }
  handleLocationChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        location: value,
      };
    });
  }
  handleStoreHoursChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        storeHours: value,
      };
    });
  }
  handleCreateRestaurant(event) {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      storeHours: this.state.storeHours,
      location: this.state.location
    });
  }
  render(){
    return(
      <form className='create-restaurant' onSubmit={this.handleCreateRestaurant}>
        <label className='header' htmlFor='name'>name</label>
        <input id='name'
          placeholder='name'
          type='text'
          value={this.state.name}
          autoComplete='off'
          onChange={this.handleNameChange}
        />
        <label className='header' htmlFor='storeHours'>StoreHours</label>
        <input id='storeHours'
          placeholder='storeHours'
          type='text'
          value={this.state.storeHours}
          autoComplete='off'
          onChange={this.handleStoreHoursChange}
        />
        <label className='header' htmlFor='location'>Location</label>
        <input id='location'
          placeholder='location'
          type='text'
          value={this.state.location}
          autoComplete='off'
          onChange={this.handleLocationChange}
        />
        <button
          className='btn-std'
          type='submit'
          disabled={!this.state.name && !this.state.storeHours && !this.state.Location}>
          Submit Restaurant
        </button>
      </form>
    );
  }
}

CreateRestaurant.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      restaurants: null,
      employees: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //TODO employeeApi.fetchEmployees()
  componentDidMount(){
    axios.all([
      restApi.fetchRestaurants(),
    ])
    .then(rests => {
      console.log('inside did mount', rests);
      this.setState(() => {
        if(rests[0] != undefined){
          return{
            restaurants: rests[0],
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
      console.log('something');
      this.setState(() => {
        if(this.state.restaurants === null){
          return [restaurant];
        } else {
          return this.state.restaurants.push(restaurant);
        }
      });
    });
  }
  render(){
    return (
      <div>
        <h1> Manage Your Restaurants </h1>
        <CreateRestaurant onSubmit={this.handleSubmit} />
        {!this.state.restaurants || !this.state.employees
          ?<Loading />
          :<div>
            </div>}
      </div>
    );
  }
}

module.exports = Home;
