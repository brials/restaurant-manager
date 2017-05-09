'use strict';

const React = require('react');
const PropTypes = require('prop-types');
const Redirect = require('react-router').Redirect; //eslint-disable-line

const restApi = require('../../service/restaurant-service');
const customerApi = require('../../service/customer-service');
const tableApi = require('../../service/table-service');
const menuItemApi = require('../../service/menuitem-service');

const Loading = require('../loading'); //eslint-disable-line
const CreateMenuItem = require('./create-menuitem'); //eslint-disable-line
const AddCustomer = require('./add-customer'); //eslint-disable-line

require('./_table-view.scss');

function MenuItemSelect(props){
  return(
    <div className='menuitem-select'>
      <h2> MenuItem </h2>
      <ul>
        {props.menuItems.map(menuItem => {
          return (
            <li
              style={menuItem.name === props.selectedMenuItem.name ? { color: '#0cd30d'}: null}
              key={menuItem.name}>
              <p onClick={props.onSelect.bind(null, menuItem)}>{menuItem.name}, ${menuItem.price}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

MenuItemSelect.propTypes = {
  selectedMenuItem: PropTypes.object.isRequired,
  menuItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function CustomerSelect(props){
  return(
    <div className='customer-select'>
      <h2> Customers </h2>
      <ul>
        {props.customers.map(customer => {
          return (
            <li
              className='customer-square'
              style={customer.menuitems.length ? {background: 'blue'}: {background: 'purple'}}
              onClick={props.onSelect.bind(null, customer)}
              key={customer.name}>
              <p style={customer.name === props.selectedCustomer.name ? { color: '#0cd30d'}: null}>
                {customer.name}
              </p>
              <button onClick={props.onPurchase.bind(null, customer)}> Buy Active Item </button>
              <button onClick={props.checkout.bind(null, customer)}> Checkout Customer </button>
              {customer.menuitems.length > 0 &&
                <ul className='purchased-items'>
                  {customer.menuitems.map((menuitem, index) => {
                    return (
                      <li key={index}> {menuitem.name} </li>
                    );
                  })}
                </ul>
                }
            </li>
          );
        })}
      </ul>
    </div>
  );
}

CustomerSelect.propTypes = {
  selectedCustomer: PropTypes.object.isRequired,
  customers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onPurchase: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired
};

class TableView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading: true,
      table: {},
      restaurant: {},
      activeMenuItem: {},
      activeCustomer: {},
      customers: [],
      sum: 0
    };
    this.postMenuItem = this.postMenuItem.bind(this);
    this.updateMenuItem = this.updateMenuItem.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
    this.onPurchase = this.onPurchase.bind(this);
    this.checkout = this.checkout.bind(this);
  }
  componentDidMount(){
    tableApi.fetchTable(this.props.match.url.match(/[^/]+$/g)[0])
    .then(table => {
      this.tempTable = table;
      return customerApi.fetchCustomers(table._id);
    })
    .then(customers => {
      this.tempCustomers = customers;
      return restApi.fetchRestaurant(this.tempTable.restaurantId);
    })
    .then(rest => {
      console.log(rest);
      this.setState(() => {
        return {
          table: this.tempTable,
          restaurant: rest,
          activeMenuItem: rest.menuitems[0],
          activeCustomer: this.tempCustomers[0],
          customers: this.tempCustomers,
          loading: false,
        };
      });
    });
  }
  postMenuItem(menuItem){
    menuItem.restaurantId = this.state.restaurant._id;
    menuItemApi.postMenuItem(menuItem)
    .then(menuItem => {
      return restApi.fetchRestaurant(menuItem.restaurantId);
    })
    .then(rest => {
      this.setState(() => {
        return {
          restaurant: rest,
          activeMenuItem: rest.menuitems[0]
        };
      });
    });
  }
  updateMenuItem(menuItem){
    this.setState(() => {
      return {
        activeMenuItem: menuItem
      };
    });
  }
  updateCustomer(customer){
    this.setState(() => {
      return {
        activeCustomer: customer
      };
    });
  }
  addCustomer(name){
    customerApi.postCustomer(name, this.state.table._id)
    .then(() => {
      return customerApi.fetchCustomers(this.state.table._id);
    })
    .then(customers => {
      this.tempCustomers = customers;
      return tableApi.fetchTable(this.state.table._id);
    })
    .then(table => {
      this.setState(() => {
        return {
          table: table,
          customers: this.tempCustomers,
          selectedCustomer: this.tempCustomers[0],
        };
      });
    });
  }
  onPurchase(customer){
    menuItemApi.connectMenuItem(customer, this.state.activeMenuItem)
    .then(() => {
      return customerApi.fetchCustomers(this.state.table._id);
    })
    .then(customers => {
      this.tempCustomers = customers;
      return tableApi.fetchTable(this.state.table._id);
    })
    .then(table => {
      this.setState(() => {
        return {
          table: table,
          customers: this.tempCustomers
        };
      });
    });
  }
  checkout(customer){
    let sum = 0;
    for(var i = 0; i < customer.menuitems.length; i++){
      sum += customer.menuitems[i].price;
    }
    this.tempSum=sum;
    customerApi.deleteCustomer(this.state.table._id, customer._id)
    .then(() => {
      return customerApi.fetchCustomers(this.state.table._id);
    })
    .then(customers => {
      this.setState(() => {
        return {
          customers: customers,
          sum: sum
        };
      });
    });
  }
  render(){
    return (
      <div className='table-view'>
        {this.state.loading
          ? <Loading />
          : <div>
              <CreateMenuItem onSubmit={this.postMenuItem} />
              {this.state.restaurant.menuitems[0] &&
                <MenuItemSelect
                onSelect={this.updateMenuItem}
                menuItems={this.state.restaurant.menuitems}
                selectedMenuItem={this.state.activeMenuItem}/>}
              <AddCustomer
                onSubmit={this.addCustomer}/>
              {this.state.customers[0] &&
                <CustomerSelect
                onSelect={this.updateCustomer}
                selectedCustomer={this.state.activeCustomer}
                customers={this.state.customers}
                onPurchase={this.onPurchase}
                checkout={this.checkout}/>}
              {this.state.sum > 0 &&
                <p> The total for that customer is ${this.state.sum}</p>}
            </div>}
      </div>
    );
  }
}

module.exports = TableView;
