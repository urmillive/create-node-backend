const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const routes = require('./routes');
const userRoutes = require('./routes/userRoutes'); // Example additional route
const productRoutes = require('./routes/productRoutes'); // Another example
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

// Register routes
app.use('/api', routes);
app.use('/api/users', userRoutes); // New route for user-related endpoints
app.use('/api/products', productRoutes); // New route for product-related endpoints

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
