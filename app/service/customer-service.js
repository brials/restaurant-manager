'use strict';

const axios = require('axios');

module.exports = {
  postCustomer: function(name, tableId){
    let url = `${__API_URL__}/api/table/${tableId}/customer`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.post(url, {name: name, tableId: tableId}, config)
    .then(res => {
      console.log('customer created', res.data);
      return res.data;
    });
  },
  fetchCustomers: function(tableId){
    let url = `${__API_URL__}/api/customer`; //eslint-disable-line
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.get(url, config)
    .then(res => {
      console.log('got customers', res.data);
      return res.data.filter(customer => {
        return customer.tableId === tableId;
      });
    });
  },
  deleteCustomer: function(tableId, customerId){
    let url = `${__API_URL__}/api/table/${tableId}/customer/${customerId}`; //eslint-disable-line
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.delete(url, config)
    .then(res => {
      return res.data;
    });
  },
};
