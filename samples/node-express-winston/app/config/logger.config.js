const winston = require('winston');
const path = require('path');

const dir = path.join(__dirname + '../../../logs/');

const filter = winston.format((info, opts) => {
  if (opts.acceptLevels.includes(info.level)) {
    return info;
  }
  return info;
});

const logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      dirname: dir,
      filename: 'combined.log',
      level: 'info',
      maxsize:  1024 * 100,
      format: winston.format.combine(
        filter({ acceptLevels: ['info'] })
      )
    }),
    new winston.transports.File({
      dirname: dir,
      filename: 'errors.log',
      level: 'error',
      maxsize:  1024 * 100,
      format: winston.format.combine(
        filter({ acceptLevels: ['error'] })
      )
    }),
    new winston.transports.File({
      dirname: dir,
      filename: 'http.log',
      level: 'http',
      maxsize: 1024 * 100,
      format: winston.format.combine(
        filter({ acceptLevels: ['http'] })
      )
    }),
    new winston.transports.Http({
      host: 'localhost',
      port: 3001,
      path: '/api/logs'
    })
  ]
});

logger.info('xxxx')
logger.error('xxxx')
logger.http('xxxx')

module.exports = logger;
