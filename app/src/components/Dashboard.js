import React, { Component } from 'react';
import requireAuth from './hoc/requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //
  //   // };
  // }

  componentDidMount() {
    let userid = localStorage.getItem('appWithAPI_userid');
    let userInfoProps ={ 'id': userid, 'token': localStorage.getItem('appWithAPI_token') };
    if(localStorage.getItem('appWithAPI_userid') === null) this.props.history.push('/signout');
    this.props.getUserInfo(userInfoProps, (id) => {
        // do things
    });
  }

  render() {
    return (
        <div className="jumbotron jumbotron-fluid mb-0 p-5">
          <div className="container text-left">
            <h3>Hello { this.props.firstname + ' ' + this.props.lastname }</h3>
            <h3>My Dashboard</h3>
            <hr />
            <p className="pt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    authError: state.auth.errorMessage
  };
}

export default requireAuth(compose(
  connect(mapStateToProps, actions)
)(Dashboard));
