import React, { Component } from 'react'
// import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Register extends Component {

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

  onSubmit = formProps => (e) => {
    e.preventDefault();
    if(!e.target.email.value || !e.target.password.value){
      this.setState({
        ErrorMessage: 'Username and password is required'
      })
    } else {
      this.setState({
        ErrorMessage: ''
      })
      let formProps = {
        'Firstname': e.target.firstName.value,
        'Middlename': e.target.middleName.value,
        'Lastname': e.target.lastName.value,
        'GroupId': e.target.groupId.value,
        "Username": e.target.email.value,
        "Password": e.target.password.value
      };
      this.props.register(formProps, () => {
        this.props.history.push('/dashboard');
      });
    }
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
    // <button>Sign Up!</button>
    // </form>
  };

  render () {
    return (
      <div className="jumbotron jumbotron-fluid mb-0">
          <div className="container">
              <h3>Register</h3>
              <div>&nbsp;</div>
              <form name="form" id="form" onSubmit={this.onSubmit()}>
                  <div>
                      <label htmlFor="firstName">First Name</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="firstName" />
                  </div>
                  <div>
                      <label htmlFor="middleName">Middle Name</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="middleName" />
                  </div>
                  <div>
                      <label htmlFor="lastName">Last Name</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="lastName" />
                  </div>
                  <div>
                      <label htmlFor="groupId">Group ID</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="groupId" />
                  </div>
                  <div>
                      <label htmlFor="email">Email (Username)</label>
                      <input type="text" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="email" placeholder="Required" />
                  </div>
                  <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" className="form-control col-lg-8 col-md-10 col-sm-12 col-xs-12" name="password" placeholder="Required"  />
                  </div>
                  <br />
                  <div className="form-group">
                      <div>{this.state.ErrorMessage}</div>
                      <button className="btn btn-primary">Register</button>
                      <Link to="/" className="btn btn-link">Cancel</Link>
                  </div>
              </form>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions)
)(Register);
