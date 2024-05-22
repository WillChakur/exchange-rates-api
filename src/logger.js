const { format, createLogger, transports } = require("winston");

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `[${level}] ${timestamp}   ${message}`;
});

const logger = createLogger({
    level: "debug",
    format: combine(
        colorize(),
        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss",
        }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "src/server.log",
        })
    ],
});

module.exports = logger;