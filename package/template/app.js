const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const routes = require('./routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

// Register routes
app.use('/api', routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
