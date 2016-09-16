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
  componentWillMount() {this.renderLine()}
  componentDidUpdate() { this.renderLine(); }
  // componentDidMount() { this.renderLine(); }
  renderLine(){
    this.line = d3.line()
                    .x((d)=>{return this.props.xScale(d.date)})
                    .y((d)=>{return this.props.yScale(d.count)});
                    // .curve(d3.curveCardinal.tension(0.5));
  }

  render(){
    // console.log(this.line([this.props.data[14]]));
    // console.log(this.props.data);
    return (
      <path className={'line'}  d={this.line(this.props.data)}></path>
    )
  }
}

export default MainLine;
