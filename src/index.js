const express = require('express');
const cors= require('cors');
const logger= require('morgan');
const bodyParser = require('body-parser');

const reservationRoutes = require('./routes/reservation.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bikeRoutes = require('./routes/bike.routes');
const {error404,error500} = require('../src/middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3306;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;
if(env !=='test'){
app.use(logger(logLevel));
}
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/bike', bikeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/reservation', reservationRoutes);

app.use(error404);
app.use(error500);

app.listen(port, () => {
     console.log(`Running on port: ${port} ...`);
});


