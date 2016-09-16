
import {Builder,Model} from 'sequelize-classes';
import {STRING,FLOAT,INTEGER} from 'sequelize';


const options = {
  database : '',
  config: {
    storage: process.env.DB_NAME,
    dialect: 'sqlite',
    logging: false
  }
};

class GridModel extends Model{
  name = {type:STRING,allowNull:false}
}


var DB=new Builder(options,[GridModel]);

export default DB;
