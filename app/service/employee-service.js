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
  }
};
