'use strict';

const React = require('react'); //eslint-disable-line

require('./_about-view.scss');

function AboutView(){
  return (
    <div className='about'>
      <img src={require('../../assets/brian.jpg')} alt="my bio pic"/>
      <article>
        <h1> Restaurant Manager: by Brian Alspach </h1>
        <p> Restaurant Manager is an app that is designed to help a restaurant owner and their employees manage 1 or multiple restaurants.  It is built using React as the front end framework.  The github repo can be found at <a href='https://github.com/brials/restaurant-manager'> 'https://github.com/brials/restaurant-manager' </a>.  It connects to the backend framework which I built using Express as the router and MongoDB as my no SQL database. The github repo for the backend can be found at.<a href='https://github.com/brials/restaurant-api/'> 'https://github.com/brials/restaurant-api/'</a>.  This app was intended to be a place for me to practice React as it is the first app I have built using it. The app was completed as a week long sprint and only minor changes have been made outside of that 5 day build time.  Thank you very much for taking the time to look around.</p>
      </article>
      <h2> Known Issues </h2>
      <ul>
        <li>The first customer added to a table does not immediately render but rather takes a refresh.</li>
        <li>Logout button does not redirect to login page if user did not login.</li>
        <li>User can still access home page without logging in. Loading screen just sits their permanently which may confuse user</li>
        <li>Way to delete menu item not built yet so menu items are permanent once added to a restaurant.</li>
      </ul>
    </div>
  );
}


module.exports = AboutView;
