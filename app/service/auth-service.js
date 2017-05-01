'use strict';

const axios = require('axios');

function setToken(token){
  if(!token){
    return Promise.reject(new Error('no token'));
  }
  localStorage.token = token; //eslint-disable-line
  console.log('set to storage');
  return Promise.resolve(token);
}

module.exports = {
  signup: function(user){
    let url = `${__API_URL__}/api/signup`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return axios.post(url, user, config)
    .then(res => {
      console.log('then block');
      return setToken(res.data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
  },
  signin: function(user){
    let url = `${__API_URL__}/api/signin`; //eslint-disable-line
    let base64 = window.btoa(`${user.username}:${user.password}`);
    console.log(base64);
    let config = {
      headers: {
        'Accept': 'application/json',
        Authorization: `Basic ${base64}`
      }
    };

    return axios.get(url, config)
    .then(res => {
      console.log('signed in');
      return setToken(res.data);
    });
  }
};
