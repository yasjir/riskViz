
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Home from '../components/Home';
import * as gridActions from '../actions/grid';


function mapStateToProps(state) {
  // console.log(state);
  return {
    data : state.grid
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(gridActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
