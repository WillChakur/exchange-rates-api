const { format, createLogger, transports, addColors } = require('winston');

const { combine, timestamp, label, json, prettyPrint, colorize} = format;
const CATEGORY = "winston custom format";

// const customFormat = printf(({ level, message, label, timestamp }) => {
//     return `${timestamp} [${label}] ${level}: ${message}`;
// });


const logger = createLogger({
    level: 'debug',
    format: combine(
        label({ label: CATEGORY }),
        json(),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss"
        }),
        prettyPrint(),
    ),
    transports: [
        new transports.Console({}),
        new transports.File({filename: 'src/server.log'})
    ],
});

module.exports = logger;