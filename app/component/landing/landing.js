const React = require('react');
const Auth = require('../../service/auth-service');
const PropTypes = require('prop-types');
const ReactRouter = require('react-router-dom');
const Redirect = require('react-router').Redirect //eslint-disable-line

require('./_landing.scss')

class SignUp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  handleUsernameChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        username: value,
      };
    });
  }
  handlePasswordChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        password: value,
      };
    });
  }
  handleEmailChange(event){
    let value = event.target.value;
    this.setState(function(){
      return{
        email: value,
      };
    });
  }
  handleSignUp(event) {
    event.preventDefault();
    this.props.onSubmit({
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    });
  }
  render(){
    return (
      <form className='signup' onSubmit={this.handleSignUp}>
        <label className='header' htmlFor='username'>Username</label>
        <input id='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          autoComplete='off'
          onChange={this.handleUsernameChange}
          required
        />
        <label className='header' htmlFor='password'>Password</label>
        <input id='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          autoComplete='off'
          onChange={this.handlePasswordChange}
          required
        />

        {this.props.viewShown === 'signup' &&
          <div>
            <label className='header' htmlFor='email'>Email</label>
            <input id='email'
              placeholder='email'
              type='email'
              value={this.state.email}
              autoComplete='off'
              onChange={this.handleEmailChange}
              required
            />
          </div>}
        <button
          className='btn-std'
          type='submit'
          disabled={!this.state.username || !this.state.password}>
          {this.props.viewShown}
        </button>
      </form>
    );
  }
}

SignUp.propTypes ={
  onSubmit: PropTypes.func.isRequired,
  viewShown: PropTypes.string.isRequired
};

class Landing extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      viewShown: 'signup',
      viewHidden: 'signin',
      loggedIn: false
    };

    this.updateView = this.updateView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateView(){
    this.setState(function(){
      let newState = {};
      newState['viewShown'] = this.state.viewHidden;
      newState['viewHidden'] = this.state.viewShown;
      return newState;
    });
  }
  handleSubmit(user){
    Auth[this.state.viewShown](user)
    .then(res => {
      console.log(res);
      console.log('props',this.props);
      this.setState(function(){
        let newState ={
          loggedIn: true
        };
        return newState;
      });
    });
  }
  render(){
    console.log('in landing', this.props);
    console.log('in landing', this.state);
    let view = this.state.viewShown;
    let hidden = this.state.viewHidden;
    return (
      <div>
        <h1> {view} </h1>
        <SignUp viewShown={view} onSubmit={this.handleSubmit}/>

        <button className='btn-std' onClick={this.updateView}>{hidden}</button>

        {this.state.loggedIn &&
          <Redirect to='/home'/>}
      </div>
    );
  }
}

module.exports = Landing;
