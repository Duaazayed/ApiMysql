    exports.CREATE_BIKE_TABLE = `CREATE TABLE bikeinfo (
    bike_id int(11) NOT NULL AUTO_INCREMENT,
    bike_name varchar(30) NOT NULL,
    description varchar(100) NOT NULL,
    rent_price float NOT NULL,
    PRIMARY KEY (bike_id)
    )`; 

    exports.ALL_BIKES = `SELECT * FROM bikeinfo`;
    exports.SINGLE_BIKE= `SELECT * FROM bikeinfo WHERE bike_id = ?`;
    exports.INSERT_BIKE= `INSERT INTO bikeinfo (bike_name) VALUES(?)`;
    exports.UPDATE_BIKE= `UPDATE bikeinfo SET bike_name = ?, description = ?, rent_price = ?  WHERE bike_id= ?`;
    exports.DELETE_BIKE= `DELETE FROM bikeinfo WHERE bike_id= ?`;
