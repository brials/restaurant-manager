'use strict';

const React = require('react');
const PropTypes = require('prop-types');

class CreateMenuItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      price: 0
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCreateMenuItem = this.handleCreateMenuItem.bind(this);
  }
  handleNameChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        name: value,
      };
    });
  }
  handlePriceChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        price: value,
      };
    });
  }
  handleCreateMenuItem(event) {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      price: this.state.price
    });
  }
  render(){
    return(
      <form className='create-menuItem' onSubmit={this.handleCreateMenuItem}>
        <h2> New MenuItem </h2>
        <label className='header' htmlFor='name'>Name: </label>
        <input id='name'
          placeholder='name'
          type='text'
          value={this.state.name}
          autoComplete='off'
          onChange={this.handleNameChange}
        />
        <label className='header' htmlFor='price'>Price: </label>
        <input id='price'
          placeholder='price'
          type='number'
          value={this.state.price}
          autoComplete='off'
          onChange={this.handlePriceChange}
        />
        <button
          className='active'
          type='submit'
          disabled={!this.state.name && !this.state.price}>
          Submit MenuItem
        </button>
      </form>
    );
  }
}

CreateMenuItem.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

module.exports = CreateMenuItem;
