'use strict';

const axios = require('axios');

module.exports = {
  postTable: function(table, restaurant){
    let url = `${__API_URL__}/api/restaurant/${restaurant._id}/table`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.post(url, table, config)
    .then(res => {
      console.log('table created', res.data);
      return res.data;
    });
  },
  addTableToEmployee: function(employee, table){
    let url = `${__API_URL__}/api/employee/${employee._id}/addTable/${table._id}`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };
    return axios.put(url, null, config)
    .then(res => {
      console.log('employee controlled table', res.data);
      return res.data;
    });
  }
};
