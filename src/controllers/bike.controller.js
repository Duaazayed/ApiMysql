const connection = require('../db-config');
const queries = require('../queries/bike.queries');
const query =require('../utils/query');
//I am trying to do like as in the video example is that right? or needs any update?

exports.getAllBikes =  async(_req, res)=>{
    const con = await connection().catch( err => {throw err});
    con.query(queries.ALL_BIKES, function(err, result, fields){
        if(err){
            res.send(err);
        }
        res.json(result);
    });
};

exports.getBike = async(req, res)=>{
    const con = await connection().catch( err => {throw err});
    con.query(queries.SINGLE_BIKE, [req.params.bike_id],function(err, result){
        if(err){
            res.send(err);
        }
        res.json(result);
    });
};
exports.createBike = async(req, res) =>{
    const con = await connection().catch( err => {throw err});
    con.query(queries.INSERT_BIKE, [req.body.bike_name, req.body.description, req.body.rent_price], function(err, result){
        if(err){
            res.send(err);
        }
        console.log(result);
        res.json({ message: 'Reservation Created: ' + result.affectedRows });
    });
};
exports.updateBike = async(req, res)=>{
    const con = await connection().catch( err => {throw err});
    con.query(
        queries.UPDATE_BIKE,
         [req.body.bike_name, req.body.description, req.body.rent_price, req.params.bike_id],
         function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
    });
};

exports.deleteBike = async(req, res)=>{
    const con = await connection().catch( err => {throw err});
    con.query(queries.DELETE_BIKE,[req.params.bike_id], function(err){
        if(err){
            res.send(err);
        }
        
        res.json({ message : 'Deleted succussfully.'});
    });
};