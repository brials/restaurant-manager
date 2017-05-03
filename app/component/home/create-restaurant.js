const React = require('react');
const PropTypes = require('prop-types');

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
        <h2> Input A New Restaurant </h2>
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

module.exports = CreateRestaurant;
