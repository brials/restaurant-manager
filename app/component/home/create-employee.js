'use strict';

const React = require('react');
const PropTypes = require('prop-types');

class CreateEmployee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      employeeTitle: '',
      hoursLogged: 0
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmployeeTitleChange = this.handleEmployeeTitleChange.bind(this);
    this.handleHoursLoggedChange = this.handleHoursLoggedChange.bind(this);
    this.handleCreateEmployee = this.handleCreateEmployee.bind(this);
  }
  handleNameChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        name: value,
      };
    });
  }
  handleEmployeeTitleChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        employeeTitle: value,
      };
    });
  }
  handleHoursLoggedChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        hoursLogged: value,
      };
    });
  }
  handleCreateEmployee(event) {
    event.preventDefault();
    this.props.onSubmit({
      name: this.state.name,
      hoursLogged: this.state.hoursLogged,
      employeeTitle: this.state.employeeTitle
    });
  }
  render(){
    return(
      <form className='create-employee' onSubmit={this.handleCreateEmployee}>
        <h2> Hire A New Employee </h2>
        <label className='header' htmlFor='name'>name</label>
        <input id='name'
          placeholder='name'
          type='text'
          value={this.state.name}
          autoComplete='off'
          onChange={this.handleNameChange}
        />
        <label className='header' htmlFor='hoursLogged'>HoursLogged</label>
        <input id='hoursLogged'
          placeholder='hoursLogged'
          type='number'
          value={this.state.hoursLogged}
          autoComplete='off'
          onChange={this.handleHoursLoggedChange}
        />
        <label className='header' htmlFor='employeeTitle'>EmployeeTitle</label>
        <input id='employeeTitle'
          placeholder='employeeTitle'
          type='text'
          value={this.state.employeeTitle}
          autoComplete='off'
          onChange={this.handleEmployeeTitleChange}
        />
        <button
          className='btn-std'
          type='submit'
          disabled={!this.state.name && !this.state.hoursLogged && !this.state.EmployeeTitle}>
          Submit Employee
        </button>
      </form>
    );
  }
}

CreateEmployee.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

module.exports = CreateEmployee;
