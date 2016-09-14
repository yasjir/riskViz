import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import * as d3 from "d3";
import Axis from './Axis.js'
import Grid from './Grid.js'

export var resizeMixin = ComposedComponent => class extends React.Component {
    componentWillMount(){
        d3.select(window).on('resize', (e) => {
            this.updateSize();
        });

        this.setState({width:this.props.width});

    }
    componentDidMount() {
        this.updateSize();
    }
    componentWillUnmount(){
        d3.select(window).off('resize');
    }

    updateSize(){
        var node = ReactDOM.findDOMNode(this);
        var parentWidth=parseInt(d3.select(node).style('width'));

        if(parentWidth<this.props.width){
            this.setState({width:parentWidth-20});
        }else{
            this.setState({width:this.props.width});
        }
    }
    render() {
       return <ComposedComponent {...this.props} {...this.state} />;
    }
};

class Chart extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        width:500
      };
  }

  static propTypes: {
        width:React.PropTypes.number,
        height:React.PropTypes.number,
        chartId:React.PropTypes.string,
        interpolations:React.PropTypes.string,
        data:React.PropTypes.array.isRequired,
        xData:React.PropTypes.string.isRequired,
        yData:React.PropTypes.string.isRequired,
        margin:React.PropTypes.object,
        yMaxBuffer:React.PropTypes.number
    };

    static defaultProps ={
                width: 800,
                height: 300,
                chartId: 'v1_chart',
                interpolations:'linear',
                margin:{
                    top: 5, right: 5, bottom: 5, left: 5
                },
                yMaxBuffer:10
        };


        createChart(_self){
          console.log(this.state);
            this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
            this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);

            this.xScale = d3.scaleTime()
                .domain(d3.extent(this.props.data, function (d) {
                    return d[_self.props.xData];
                }))
                .rangeRound([0, this.w]);

            this.yScale = d3.scaleLinear()
                .domain([0,d3.max(this.props.data,function(d){
                    return d[_self.props.yData]+_self.props.yMaxBuffer;
                })])
                .range([this.h, 0]);



            this.area = d3.area()
                .x((d) => {
                    return this.xScale(d[this.props.xData]);
                })
                .y0(this.h)
                .y1((d)=> {
                    return this.yScale(d[this.props.yData]);
                }).curve(d3.curveCardinal.tension(0.5));


            var interpolations = [
                "linear",
                "step-before",
                "step-after",
                "basis",
                "basis-closed",
                "cardinal",
                "cardinal-closed"];


            this.transform='translate(' + this.props.margin.left + ',' + this.props.margin.top + ')';
        }

        createElements(element,i){
            var object;
            var _self=this;

            switch(element.type){

                case 'xGrid':
                    object=<Grid h={this.h} len={this.h} scale={this.xScale} gridType="x" key={i} {...this.props} {...element.props}/>;
                    break;

                case 'yGrid':
                    object=<Grid h={this.h} len={this.w} scale={this.yScale} gridType="y" key={i} {...this.props} {...element.props}/>;
                    break;

                case 'xAxis':
                    object=<Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
                    break;

                case 'yAxis':
                    object=<Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
                    break;

                case 'area':

                    var data=[];

                    for(var k=0,j=0;k<this.props.data.length;++k){
                        if(this.props.data[k][_self.props.type]===element.props.value){
                            data[j]=this.props.data[k];
                            ++j;
                        }
                    }
                    object=<path className={element.props.className} d={this.area(data)} key={i} fill={element.props.fill}/>;
                    break;


            }
            return object;
        }
        render(){
            this.createChart(this);
            var elements;
            var _self=this;

            if(this.props.children!=null) {
                if (Array.isArray(this.props.children)) {
                    elements=this.props.children.map(function(element,i){
                        return _self.createElements(element,i)
                    });
                }else{
                    elements=this.createElements(this.props.children,0)
                }
            }

            return (
                <div>
                    <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                        <g transform={this.transform}>
                            {elements}
                        </g>
                    </svg>
                </div>
            );
        }
}

export default resizeMixin(Chart);
