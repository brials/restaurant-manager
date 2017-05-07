'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const Redirect = require('react-router').Redirect; //eslint-disable-line

const restApi = require('../../service/restaurant-service');
const tableApi = require('../../service/table-service');
const employeeApi = require('../../service/employee-service');

const Loading = require('../loading'); //eslint-disable-line

require('./_restaurant-view.scss');

function EmployeeSelect(props){
  return(
    <div className='employee-select'>
      <h2> Employee </h2>
      <ul>
        {props.employees.map(emp => {
          return (
            <li
              style={emp.name === props.selectedEmployee.name ? { color: '#0cd30d'}: null}
              key={emp.name}>
              <p onClick={props.onSelect.bind(null, emp)}>{emp.name}</p>
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
};

function TableSelect(props){
  return(
    <div className='table-select'>
      <h2> Tables </h2>
      <section className='table-grid'>
        {props.tables.map(table => {
          let employee = 'nobody';
          for(let i = 0; i < props.employees.length; i++){ //inefficient workaround to database desgin
            for(let b = 0; b < props.employees[i].tables.length; b++){
              if(props.employees[i].tables[b].toString() === table._id.toString()){
                employee = props.employees[i].name;
              }
            }

          }
          return (
            <div
              className='table-square'
              key={table.tableNum}
              style={table.customers.length ? {background: 'blue'}: {background: '#d46a6a'}}
              onClick={props.onSelect.bind(null, table)}>
              <p
                style={table.tableNum === props.selectedTable.tableNum ? {color: '#0cd30d'}: null}>
                {table.tableNum} </p>
              <p> Current Customers: {table.customers.length}</p>
              <button onClick={props.inspectTable.bind(null, table)}> Inspect Table </button>
              <p> {employee} is currently serving </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

TableSelect.propTypes ={
  onSelect: PropTypes.func.isRequired,
  tables: PropTypes.array.isRequired,
  selectedTable: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired,
  inspectTable: PropTypes.func.isRequired,
};

function RestaurantDetails(props){
  return (
    <div className='restaurant-details'>
      <h2> Restaurant Info </h2>
      <p> Name : {props.rest.name} </p>
      <p> Hours : {props.rest.storeHours} </p>
      <p> Location : {props.rest.location} </p>
    </div>
  );
}

RestaurantDetails.propTypes = {
  rest: PropTypes.object.isRequired
};

class RestaurantView extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      restaurant: {},
      activeTable: {},
      activeEmployee: {},
      loading: true,
      inspectTable: false,
    };
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.assignEmployee = this.assignEmployee.bind(this);
    this.clockOutEmployee = this.clockOutEmployee.bind(this);
    this.inspectTable = this.inspectTable.bind(this);
  }
  componentDidMount(){
    restApi.fetchRestaurant(this.props.match.url.match(/[^/]+$/g)[0])
    .then(res => {
      this.setState(() => {
        return {
          restaurant: res,
          activeTable: res.tables[0],
          activeEmployee: res.employees[0],
          loading: false
        };
      });
    });
  }
  updateEmployee(employee){
    this.setState(() => {
      return {
        activeEmployee: employee
      };
    });
  }
  updateTable(table){
    this.setState(() => {
      return {
        activeTable: table
      };
    });
  }
  assignEmployee(){
    tableApi.addTableToEmployee(this.state.activeEmployee, this.state.activeTable)
    .then(() => {
      return restApi.fetchRestaurant(this.state.restaurant._id);
    })
    .then(rests => {
      let activeTableId = this.state.activeTable._id.toString();
      let activeEmployeeId = this.state.activeEmployee._id.toString();
      let index = -1;
      for(let i = 0; i < rests.tables.length; i++){
        if(rests.tables[i]._id.toString() == activeTableId){

          index = i;
        }
      }
      let empIndex = -1;
      for(let b = 0; b < rests.employees.length; b++){
        if(rests.employees[b]._id.toString() == activeEmployeeId){

          empIndex = b;
        }
      }
      this.setState(() => {
        return {
          restaurant: rests,
          activeTable: rests.tables[index],
          activeEmployee: rests.employees[empIndex]
        };
      });
    });
  }
  clockOutEmployee(){
    employeeApi.clockOut(this.state.activeEmployee)
    .then(() => {
      return restApi.fetchRestaurant(this.state.restaurant._id);
    })
    .then(rests => {
      let activeEmployeeId = this.state.activeEmployee._id.toString();
      let empIndex = -1;
      for(let b = 0; b < rests.employees.length; b++){
        if(rests.employees[b]._id.toString() == activeEmployeeId){

          empIndex = b;
        }
      }
      this.setState(() => {
        return {
          restaurant: rests,
          activeEmployee: rests.employees[empIndex]
        };
      });
    });
  }
  inspectTable(){
    this.setState(() => {
      return {
        inspectTable: true
      };
    });
  }
  render(){
    let rest = this.state.restaurant;
    var destination = '/table/' + this.state.activeTable._id;
    return (
      <div className='restaurant-view'>
        {this.state.inspectTable &&
          <Redirect to={destination} />}
        {this.state.loading
          ? <Loading />
          : <div>
              <RestaurantDetails rest={rest} />
              <EmployeeSelect
                selectedEmployee={this.state.activeEmployee}
                onSelect={this.updateEmployee}
                employees={rest.employees}/>
              <button onClick={this.assignEmployee}> Assign Employee to Table </button>
              <button onClick={this.clockOutEmployee}> Clock Out Active Employee </button>
              <TableSelect
                selectedTable={this.state.activeTable}
                onSelect={this.updateTable}
                tables={rest.tables}
                addCustomer={this.addCustomer}
                employees={rest.employees}
                inspectTable={this.inspectTable}/>
            </div>}
      </div>
    );
  }
}

module.exports = RestaurantView;
