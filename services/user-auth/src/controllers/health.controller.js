const db = require('../config/db');
const AppError = require('../utils/AppError')
const {responseSuccess} =require('../utils/response')

async function healthCheck(req, res, next) {
    try {
        await db.$queryRaw`SELECT 1`;
        return responseSuccess(res, {status: 'ok', db: 'up'})
    } catch (error) {
        return next(new AppError(
            'Database connection failed',
            503,
            'DB_UNAVAILABLE'
        ))
    }
}

module.exports = {healthCheck};