'use strict';

const React = require('react'); //eslint-disable-line

require('./_about-view.scss');

function AboutView(){
  return (
    <div className='about'>
      <img src={require('../../assets/brian.jpg')} alt="my bio pic"/>
      <article>
        <h1> Restaurant Manager: by Brian Alspach </h1>
        <p> Restaurant Manager is an app that is designed to help a restaurant owner and their employees manage 1 or multiple restaurants.  It is built using React as the front end framework.  The github repo can be found at <a href='https://github.com/brials/restaurant-manager'> 'https://github.com/brials/restaurant-manager' </a>.  It connects to the backend framework which I built using Express as the router and MongoDB as my no SQL database. The github repo for the backend can be found at.<a href='https://github.com/brials/restaurant-api/'> 'https://github.com/brials/restaurant-api/' </a>.  This app was intended to be a place for me to practice React as it is the first app I have built using it.  Thank you very much for taking the time to look around.</p>
      </article>
    </div>
  );
}


module.exports = AboutView;
