import React, { Component, PropTypes } from 'react';
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

        this.grid = d3.axis()
              .scale(this.props.scale)
              .orient(this.props.orient)
              .ticks(this.props.ticks)
              .tickSize(-this.props.len, 0, 0)
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
