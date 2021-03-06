'use strict';

const axios = require('axios');

module.exports = {
  postEmployee: function(employee){
    let url = `${__API_URL__}/api/employee`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.post(url, employee, config)
    .then(res => {
      console.log('success', res.data);
      return res.data;
    });

  },

  fetchEmployees: function(){
    let url = `${__API_URL__}/api/employee`; //eslint-disable-line
    let config = {
      headers: {

        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.get(url, config)
    .then(res => {
      console.log('success', res.data);
      return res.data;
    });
  },
  deleteEmployee: function(employee){
    let url = `${__API_URL__}/api/employee/${employee._id}`; //eslint-disable-line
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.delete(url, config)
    .then(res => {
      console.log('success', res.data);
      return res.data;
    });
  },
  connectEmployee(rest, emp){
    let url = `${__API_URL__}/api/restaurant/${rest._id}/addEmployee/${emp._id}`; //eslint-disable-line
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.put(url, null, config)
    .then(res => {
      console.log('success', res.data);
      return res.data;
    });
  },
  clockOut(emp){
    let url = `${__API_URL__}/api/employee/${emp._id}`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.put(url, {name: emp.name,employeeTitle: emp.employeeTitle, tables: []}, config)
    .then(res => {
      console.log('employee clocked out', res.data);
      return res.data;
    });
  }
};
