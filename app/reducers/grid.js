import { GET_GRID_STATE,GET_SIMULATIONS_8H_RESULTS,GET_SIMULATIONS_BASE_DATETIME } from '../actions/grid';
import {formatWithZeros} from '../utils/utils.js'

const transformFaultData = (faults) =>{
        var line_occurence = {};
        var grid_cost = 0
        console.log(faults);
        var result = faults.reduce( (res,d)=>{
          if(!res[d.load]){
            res[d.load]={};
            res[d.load][d.name] = 0;
          }else if(!res[d.load][d.name]){
            res[d.load][d.name] = 0;
          }

          if(!line_occurence[d.name]){
            line_occurence[d.name] =0;
          }
          res[d.load][d.name] += d.cost;
          line_occurence[d.name] +=1;
          return res;
        },{});
        result = Object.keys(result).reduce((previous,key) => {
          return [...previous,
                  ...Object.keys(result[key]).map((d)=>{
                      var corrected_cost = 3.*result[key][d]/line_occurence[d];
                      grid_cost += corrected_cost;
                      return {
                        line:d,
                        cost:corrected_cost,
                        load:key
                      };
                  })];
        },[]);
        return {
          grid_state: result,
          grid_cost: grid_cost
        }
}

export default function grid(state = {grid_state:[]}, action) {
  console.log(action);
  switch (action.type) {
    case GET_GRID_STATE:
      return {
        ...state,
        ...transformFaultData(action.grid_state)
      };
    case GET_SIMULATIONS_BASE_DATETIME:
    // console.log(action.datetime_steps);
      return {
        ...state,
        simulation_base_date_times : action.datetime_steps.map((d)=>{
          return d.base_datetime;
        })
      };
    case GET_SIMULATIONS_8H_RESULTS:
      // console.log(action.simulation_data);
      var base_hour = action.base_hour,
          next_hour = formatWithZeros(base_hour+1,2);
      // console.log(`2016-09-12 ${next_hour}:00:00.000000`);
      // console.log(`2016-09-12 ${base_hour}:00:00.000000`);


      //TODO!!!!


      return {
        ...state,
        ...transformFaultData(action.simulation_data.filter((fault)=>{
              return fault.sim_datetime===`2016-09-12 ${next_hour}:00:00.000000`;
            }))
      };
    default:
      return state;
  }
}
