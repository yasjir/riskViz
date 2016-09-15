import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import Chart from './Chart.js';
import * as d3 from "d3";
import moment from 'moment';


export default class Home extends Component {
  render() {
    // console.log('SwwwS');
    var parseDate = d3.timeParse("%m-%d-%Y");
    // console.log(moment);
        var dataArea=[];

        for(var i=0,j=0;i<15;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 30) + 5),type:'A'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(var i=15,j=0;i<30;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 40) + 20),type:'B'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }
        for(var i=30,j=0;i<45;++i,++j){

            var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 50) + 30),type:'C'};
            d.date = parseDate(d.day);
            dataArea[i]=d;
        }

        // console.log(JSON.stringify(dataArea));

        var margin={
            top: 20, right: 30, bottom: 20, left: 50
        };


        return(
            <div className="row">
              <div className="col-md-6">
              <Chart data={dataArea} xData="date" yData="count" type="type" margin={margin}
                               yMaxBuffer={10} id="multi-area-chart" interpolations="cardinal"  width={500} height={300}>
                  <yGrid orient="left" className="y-grid" ticks={5}/>
                  <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
                  <yAxis orient="left" className="axis" ticks={5}/>
                <avLine className='av-line'/>
                  {/* <area className="area" fill="#ca6f96" value="C"/> */}
                  {/* <area className="area" fill="#53c79f" value="B"/>
                <area className="area" fill="#e58c72" value="A"/> */}
              </Chart>
              </div>
              <div className="col-md-6"></div>
            </div>
        );
      }
}
