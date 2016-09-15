import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from "d3";

class MainLine extends Component {
  static propTypes = {
    className:React.PropTypes.string,
    data:React.PropTypes.array.isRequired,
    xScale:React.PropTypes.func.isRequired,
    yScale:React.PropTypes.func.isRequired,
    stroke:React.PropTypes.string,
  };

  static defaultProps = {
    className:'average-line',
    stroke:'#000000'
  }
  componentDidUpdate() { this.renderLine(); }
  componentDidMount() { this.renderLine(); }
  renderLine(){
    this.line = d3.line()
                    .x((d)=>{return  this.props.xScale(d.date)})
                    .y((d)=>{return  this.props.yScale(d.count)})
                    .curve(d3.curveCardinal.tension(0.5));
    this.xy=this.line(this.props.data)
  }

  render(){
    console.log(this.props.data);
    console.log(this.line(this.props.data));
    return (
      <path className={this.props.className}  d={this.xt}  />
    )
  }
}

export default MainLine;
