const express = require('express');
const healthRoutes = require('./routes/health.routes');
const { notFoundHandler, errorHandler} = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('user-auth service');
});

app.use('/api/v1', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;