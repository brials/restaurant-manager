'use strict';

const axios = require('axios');

module.exports = {
  postRestaurant: function(restaurant){
    let url = `${__API_URL__}/api/restaurant`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.post(url, restaurant, config)
    .then(res => {
      console.log('success', res.data);
      return res.data;
    });

  },
  fetchRestaurants: function(){
    let url = `${__API_URL__}/api/restaurant`; //eslint-disable-line
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
  fetchRestaurant: function(restId){
    let url = `${__API_URL__}/api/restaurant/${restId}`; //eslint-disable-line
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
  deleteRestaurant: function(rest){
    let url = `${__API_URL__}/api/restaurant/${rest._id}`; //eslint-disable-line
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
  }
};
