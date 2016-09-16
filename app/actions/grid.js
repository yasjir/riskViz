import sqlite3 from 'sqlite3';
import *  as moment from 'moment'
import {formatWithZeros} from '../utils/utils.js'

export const GET_GRID_STATE = 'GET_GRID_STATE';
export const GET_SIMULATIONS_BASE_DATETIME = 'GET_SIMULATIONS_BASE_DATETIME';
export const GET_SIMULATIONS_8H_RESULTS='GET_SIMULATIONS_8H_RESULTS';

sqlite3.verbose();
const db = new sqlite3.Database(process.env.DB_NAME);

export const getGridState = (base_hour, sim_hour) => (dispatch,getState) => {
    console.log(getState());

    //TODO!!!!

      dispatch({
        type: GET_GRID_STATE,
        grid_state: []
      });
}

export const getSimulationsBaseDateTime = () => dispatch => {
  db.all('select base_datetime from simulation group by base_datetime', {},
   (err, rows) => {
      if(err){
        console.error(err);
        return;
      }
      dispatch({
        type: GET_SIMULATIONS_BASE_DATETIME,
        datetime_steps: rows
      });
    });
}

export const getSimulation8hResults = (base_hour) => dispatch => {
  var base = formatWithZeros(base_hour,2);
  console.log(`2016-09-12 ${base}:00:00.000000`);
  db.all('select fault.cost_sum_p as cost ,line.name, simulation.load ,simulation.sim_datetime from fault \
inner join simulation on fault.simulation_id=simulation.id \
inner join faulted_line on faulted_line.fault_id=fault.id \
inner join line on faulted_line.line_id=line.id \
where simulation.base_datetime like $base \
order by line.name,faulted_line.position',
  {
    $base: `2016-09-12 ${base}:00:00.000000`
  }, (err, rows) => {
      if(err){
        console.error(err);
        return;
      }
      dispatch({
        type: GET_SIMULATIONS_8H_RESULTS,
        simulation_data: rows,
        base_hour : base_hour
      });
    });
}
