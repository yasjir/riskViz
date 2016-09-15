import React, { Component, PropTypes} from 'react';
import ReactDOM from 'react-dom'
import * as d3 from "d3";
import Axis from './Axis.js'
import Grid from './Grid.js'
import MainLine from './MainLine.js'
//

class Chart extends Component {
  // constructor(props, context) {
  //     super(props, context);
  //     // this.state = {
  //     //   width:500
  //     // };
  // }
  state ={
    width:500,
    height: 300,
  };

  static propTypes= {
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

    componentWillMount(){
        d3.select(window).on('resize', (e) => {
            this.updateSize();
        });

        this.setState({width:this.props.width,
                        height:this.props.height,});

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
        var bodyHeight=parseInt(window.innerHeight);
        // console.log([parentWidth,this.props.width]);
        // console.log("J:  "+bodyHeight)
        if(parentWidth>this.props.width){
          // console.log('OK');
          // console.log({width:parentWidth-20});
            this.setState({width:parentWidth-20,
                            height:parseInt(bodyHeight/2)-20});
        }else{
          // console.log('OK2');
            this.setState({width:this.props.width,
                            height:parseInt(bodyHeight/2)-20});
        }
    }
        createChart(_self){
            this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
            this.h = this.state.height - (this.props.margin.top + this.props.margin.bottom);

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
                        if(this.props.data[k][this.props.type]===element.props.value){
                            data[j]=this.props.data[k];
                            ++j;
                        }
                    }
                    object=<path className={element.props.className} d={this.area(data)} key={i} fill={element.props.fill} fillOpacity='0.8' strokeWidth="2" />;
                    break;
                  case 'avLine':
                  var data=[];

                  for(var k=0,j=0;k<this.props.data.length;++k){
                      if(this.props.data[k][this.props.type]==='B'){
                          data[j]=this.props.data[k];
                          ++j;
                      }
                  }
                    object=<MainLine data={data} key={i} xScale={this.xScale} yScale={this.yScale} {...this.props} {...element.props}/>
                  break

            }
            return object;
        }
        render(){
            this.createChart(this);
            var elements;
            var _self=this;

            if(this.props.children!=null) {
                if (Array.isArray(this.props.children)) {
                    elements=this.props.children.map((element,i)=>{
                        return this.createElements(element,i)
                    });
                }else{
                    elements=this.createElements(this.props.children,0)
                }
            }

            return (
                <div>
                    <svg id={this.props.chartId} width={this.state.width} height={this.state.height}>

                        <g transform={this.transform}>
                            {elements}
                        </g>
                    </svg>
                </div>
            );
        }
}

Chart.defaultProps ={
                width: 800,
                height: 300,
                chartId: 'v1_chart',
                interpolations:'linear',
                margin:{
                    top: 5, right: 5, bottom: 5, left: 5
                },
                yMaxBuffer:10
        };


export default Chart;
