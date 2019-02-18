import React, { Component } from 'react';
// import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ErrorMessage: '',
      SubmitDisabled: ''
    };
  }

  componentDidMount() {
    this.props.signout();
    this.setState({
      ErrorMessage: ''
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.errorMessage !== prevProps.errorMessage && this.props.errorMessage !== ''){
      document.getElementById("form").reset();
      this.setState({
        ErrorMessage: this.props.errorMessage,
        SubmitDisabled: ''
      })
    }
  }

  onSubmit = formProps => e => {
    e.preventDefault();
    if(!e.target.email.value || !e.target.password.value){
      this.setState({
        ErrorMessage: 'Username and password is required'
      })
    } else {
      this.setState({
        ErrorMessage: ''
      })
      let formProps = { "Username": e.target.email.value, "Password": e.target.password.value };
      this.setState({
        ErrorMessage: 'Loading',
        SubmitDisabled: 'disabled'
      })
      this.props.signin(formProps, () => {
        this.setState({
          ErrorMessage: ''
        })
        this.props.history.push('/dashboard');
      });
    }
  };

  render() {

    // <form onSubmit={this.onSubmit()}>
    // <fieldset>
    //   <label>Email: <br />
    //   <input type="text" name="Email" />
    //   </label>
    // </fieldset>
    // <fieldset>
    //   <label>Password: <br />
    //   <input type="password" name="Password" />
    //   </label>
    // </fieldset>
    // <div>{this.props.errorMessage}</div>
    // <button>Sign In!</button>
    // </form>

    return (
          <div className="jumbotron jumbotron-fluid mb-0">
              <div className="container">
                  <h3>Sign In</h3>
                  <div>&nbsp;</div>
                  <form name="form" id="form" onSubmit={this.onSubmit()}>
                      <div>
                          <label htmlFor="email">Email / Username</label>
                          <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="email" autoComplete="on" />

                      </div>
                      <div>
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="password" autoComplete="off"  />
                      </div>
                      <br />
                      <div className="form-group">
                      {this.state.ErrorMessage}<br />
                      <button className="btn btn-primary" disabled={this.state.SubmitDisabled}>Sign In</button>
                          <Link to="/register" className="btn btn-link">Register</Link>
                      </div>
                  </form>
              </div>
          </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions)
)(Signin);
