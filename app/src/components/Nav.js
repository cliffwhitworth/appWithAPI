import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Nav } from 'reactstrap';
import * as actions from '../actions';

class Navi extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  renderLinks() {
    if (this.props.userid) {
      if(this.props.locationPath === 'signout'){
        return (
          <div>
            <Link className="text-white pr-2" to="/signin">SignIn</Link>
            <Link className="text-white" to="/help">Help</Link>
          </div>
        );
      } else if(this.props.locationPath === 'signin') {
        return (
          <div>
            <Link className="text-white" to="/help">Help</Link>
          </div>
        );
      } else {
        return (
          <div>
            <Link className="text-white pr-2" to="/signout">SignOut</Link>
            <Link className="text-white pr-2" to="/dashboard">Dashboard</Link>
            <Link className="text-white" to="/help">Help</Link>
          </div>
        );
      }

    } else {
      if(this.props.locationPath === 'signin'){
        return (
          <div>
            <Link className="text-white" to="/help">Help</Link>
          </div>
        );
      } else {
        return (
          <div>
            <Link className="text-white pr-2" to="/signin">SignIn</Link>
            <Link className="text-white" to="/help">Help</Link>
          </div>
        );
      }
    }
  }

  showNavWithLinks(){
    if(this.props.locationPath !== 'pagewithoutnavlinks'){
      return(
        <div className="masthead">
            <h3 className="text-muted">APP With API</h3>
            <div className="navbar navbar-dark bg-dark mb-0">
            <div className="container">
              <Link className="nav-link text-white" to="/home">Home</Link>
              <Nav className="navbar-nav">
                {this.renderLinks()}
              </Nav>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div className="masthead">
            <h3 className="text-muted">APP With API</h3>
            <div className="navbar navbar-dark bg-dark mb-0">
            <div className="container">
              <span className="text-white">NoNavLinks</span>
              <Nav className="navbar-nav">
              </Nav>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
      {this.showNavWithLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userid: state.auth.id };
}

export default connect(mapStateToProps, actions)(Navi);
