const AppError = require('../utils/AppError');

function notFoundHandler(req, res, next) {
    next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`,404, 'NOT_FOUND'));
}

function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const code = err.code || 'INTERNAL_ERROR';

    console.error(err);

    res.status(statusCode).json({
        success: false,
        error: {message: err.message || 'Internal Server Error', code},
    });
}

module.exports = {notFoundHandler, errorHandler}