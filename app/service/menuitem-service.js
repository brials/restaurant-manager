'use strict';

const axios = require('axios');

module.exports = {
  postMenuItem: function(menuItem){
    let url = `${__API_URL__}/api/restaurant/${menuItem.restaurantId}/menuItem`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.post(url, menuItem, config)
    .then(res => {
      console.log('table created', res.data);
      return res.data;
    });
  },
  connectMenuItem(customer, menuItem){
    let url = `${__API_URL__}/api/customer/${customer._id}/addMenuitem/${menuItem._id}`; //eslint-disable-line
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.put(url, null, config)
    .then(res => {
      console.log('menuItem Linked', res.data);
      return res.data;
    });
  },
};
