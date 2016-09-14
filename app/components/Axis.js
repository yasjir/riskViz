import React, { Component, PropTypes } from 'react';
import * as d3 from "d3";

class Axis extends Component {
  static propTypes={
        h:React.PropTypes.number,
        scale:React.PropTypes.func,
        axisType:React.PropTypes.oneOf(['x','y']),
        orient:React.PropTypes.oneOf(['left','top','right','bottom']),
        className:React.PropTypes.string,
        tickFormat:React.PropTypes.string,
        ticks:React.PropTypes.number
  };
  componentDidUpdate() { this.renderAxis(); }
  componentDidMount() { this.renderAxis(); }
  renderAxis() {
       var _self=this;
       this.axis = d3.axis()
            .scale(this.props.scale)
            .orient(this.props.orient)
            .ticks(this.props.ticks);

        if(this.props.tickFormat!=null && this.props.axisType==='x')
            this.axis.tickFormat(d3.time.format(this.props.tickFormat));

        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.axis);

  }
  render() {
        var translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className={this.props.className} transform={this.props.axisType=='x'?translate:""} >
            </g>
          );
  }
}

export default Axis;
