const mysql = require('mysql');
const {CREATE_RESERVATION_TABLE}= require('./queries/reservation.queries');
const {CREATE_USERS_TABLE}= require('./queries/user.queries');
const{ CREATE_BIKE_TABLE}=require('./queries/bike.queries');
const query= require('./utils/query');

const host = process.env.DB_HOST || 'localhost'; //get the host from environment or use default
const user = process.env.DB_USER || 'gbs_user'; //get the user fo DB from environment or use default
const password = process.env.DB_PASS || 'test_password';
const database = process.env.DB_DATABASE || 'gbsh'; //this reverse to Golden Bike SHop database

const connection = async () =>
new Promise(async(resolve, reject)=>{
    const con = mysql.createConnection({
    host,
    user,
    password,
    database,
});
con.connect((err) => {
  console.log('succusfully conneted');
    if (err) {
      console.log(err);
      reject(err);
      return;
    }
  });


resolve(con);
  });

  (async () => {
    const _con = await connection().catch((err) => {
      throw err;
    });

const reservationTableCreated= await query (_con, CREATE_RESERVATION_TABLE).catch(
    (err)=>{
        console.log(err);
    }
);

const userTableCreated= await query (_con, CREATE_USERS_TABLE).catch(
    (err)=>{
        console.log(err);
    }
);
const bikeTableCreated= await query (_con, CREATE_BIKE_TABLE).catch(
    (err)=>{
        console.log(err);
    }
);
if(!!userTableCreated && !! reservationTableCreated && !! bikeTableCreated){
    console.log('Tables Created!');
  }
});

module.exports = connection;
