'use strict';

const React = require('react');
const PropTypes = require('prop-types');

class AddCustomer extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddCustomer = this.handleAddCustomer.bind(this);
  }
  handleNameChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        name: value,
      };
    });
  }
  handleAddCustomer(event){
    event.preventDefault();
    this.props.onSubmit(this.state.name);
  }
  render(){
    return(
      <div className='add-customer'>
        <form className='create-customer' onSubmit={this.handleAddCustomer}>
          <h2> New Customer </h2>
          <label className='header' htmlFor='name'>Name: </label>
          <input id='name'
            placeholder='name'
            type='text'
            value={this.state.name}
            autoComplete='off'
            onChange={this.handleNameChange}
          />
          <button
            className='active'
            type='submit'
            disabled={!this.state.name && !this.state.price}>
            Submit Customer
          </button>
        </form>
      </div>
    );
  }
}

AddCustomer.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

module.exports = AddCustomer;
