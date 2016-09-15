import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from "d3";

class Grid extends Component {
  static propTypes = {
          h:React.PropTypes.number,
          len:React.PropTypes.number,
          scale:React.PropTypes.func,
          gridType:React.PropTypes.oneOf(['x','y']),
          orient:React.PropTypes.oneOf(['left','top','right','bottom']),
          className:React.PropTypes.string,
          ticks:React.PropTypes.number
  };

  componentDidUpdate () { this.renderGrid(); }
  componentDidMount () { this.renderGrid(); }
  renderGrid () {
    var axis = null;
    switch (this.props.orient) {
      case 'left':
       axis = d3.axisLeft;
       break;
      case 'right':
        axis = d3.axisRight;
        break;
      case 'top':
        axis = d3.axisTop;
        break;
      case 'bottom':
        axis = d3.axisBottom;
        break;
    }
        this.grid = axis(this.props.scale)
              .tickArguments(this.props.ticks)
              .tickSize(-this.props.len)
              .tickFormat("");

          var node = ReactDOM.findDOMNode(this);
          d3.select(node).call(this.grid);

  }
  render () {
      var translate = "translate(0,"+(this.props.h)+")";
      return (
          <g className={this.props.className} transform={this.props.gridType=='x'?translate:""}>
          </g>
      );
  }


};

export default Grid;
