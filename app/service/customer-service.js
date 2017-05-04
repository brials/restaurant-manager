'use strict';

const axios = require('axios');

module.exports = {
  postCustomer: function(tableId){
    let url = `${__API_URL__}/api/table/${tableId}/customer`; //eslint-disable-line
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${localStorage.token}` //eslint-disable-line
      }
    };

    return axios.post(url, {tableId: tableId}, config)
    .then(res => {
      console.log('customer created', res.data);
      return res.data;
    });
  }
};
