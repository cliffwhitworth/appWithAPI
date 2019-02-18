import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Welcome extends Component {

  componentDidMount() {
    // console.log(this.props);
  }

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="links">
          <Link to="/signout">SignOut</Link>
        </div>
      );
    } else {
      return (
        <div className="links">
          <Link to="/signin">SignIn</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid mb-0">
        <div className="container">
          <h3>Welcome</h3>
          {this.renderLinks()}
          <p className="pt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.username };
}

export default connect(mapStateToProps)(Welcome);
