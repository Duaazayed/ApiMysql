exports.CREATE_RESERVATION_TABLE = `CREATE TABLE IF NOT EXISTS reservation(
    reservation_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    bike_id int NOT NULL,
    reservation_date date NOT NULL,
    reservation_start_time time NOT NULL,
    reservation_end_time time NOT NULL,
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (bike_id) REFERENCES bikeinfo(bike_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    )`;
    
    exports.ALL_RESERVATION = (userId)=>`SELECT * FROM reservation WHERE user_id= ${userId}`;
    exports.SINGLE_RESERVATION= (userId, reservationId)=>`SELECT * FROM reservation WHERE reservation_id =${reservationId} AND user_id= ${userId}`;
    exports.INSERT_RESERVATION= (userId, bikeId, reservationDate, reservationStartTime, reservationEndTime) => `INSERT INTO reservation (user_id, bike_id, reservation_date, reservation_start_time, reservation_end_time) VALUES(${userId}, ${bikeId}, ${reservationDate}, ${reservationStartTime}, ${reservationEndTime})`;
    exports.UPDATE_RESERVATION= (userId, reservationId, newValues) =>`UPDATE reservation SET ${newValues} WHERE user_id= ${userId}  AND reservation_id = ${reservationId}`;
    exports.DELETE_RESERVATION= (userId, reservationId) => `DELETE FROM reservation WHERE reservation_id= ${userId} AND reservation_id= ${reservationId}`;
    exports.RESERVATION_BY_ID = (reservationId)=> `SELECT  reservation.*, users.username FROM reservation INNER JOIN users on reservation.user_id=users.user_id and reservation.reservation_id=${reservationId};`