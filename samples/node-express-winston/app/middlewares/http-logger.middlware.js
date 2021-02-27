const logger = require('../config/logger.config');

module.exports = (req, res, next) => {
    process.nextTick(() => {
        logger.http(req.headers);
    });
    next();
}
