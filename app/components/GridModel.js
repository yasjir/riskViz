import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import styles from './GridModel.css'
import * as d3 from "d3";


class GridModel extends Component{

    static propTypes = {
      data:React.PropTypes.array.isRequired,
    }

    componentDidMount() { this.loadSVG(); }
    componentDidUpdate() {
      // console.log(this.props.data)
      if(this.props.data.length>0){
        var start_load = this.props.data[0].load;
        this.drawData(start_load);
      }
    }
    loadSVG(){
      d3.xml("assets/ieee39.svg",(error, xml)=> {
        if (error) {
          return reject(error);
        }
        var node = ReactDOM.findDOMNode(this);
        d3.select('.gridModel').append(()=>{
          return xml.documentElement;
        });
      })
    }
    drawData(load){

      // console.log(d3.max(this.props.data,(d)=>{return d.cost;}));
      var colorScale = d3.scaleOrdinal()
          .range(['#ffffe0','#fff4cb','#ffeaba','#ffdfa9','#ffd59b','#ffc88e','#ffbd84','#ffb17b','#ffa474','#ff976d','#fd8b69','#f87f65','#f47461','#ef675e','#e95c5a','#e25056','#db4551','#d43a4b','#cb2f44','#c1253d','#b81b34','#ae112a','#a2071f','#970213','#8b0000'])
          .domain([0,d3.max(this.props.data,(d)=>{return d.cost;})]);
      // console.log(colorScale(1000));

      var visual_data = this.props.data
                          .filter((d)=>{return d.load = load;})
                          .reduce((res,d)=>{
                            res[d.line]=d.cost;
                            return res;
                          },{});

      var t = d3.transition()
                .duration(450)
                .ease(d3.easeLinear);
      // console.log(visual_data)
      d3.selectAll('rect')
        .transition(200)
        .style('fill',function(){

          return colorScale(visual_data[this.id.split('_')[1]]);
        });

    }
    render(){
      return (
        <div className={`gridModel ${styles.gridModel}`}></div>
      )
    }
}

export default GridModel;
