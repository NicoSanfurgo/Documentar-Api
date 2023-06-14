const log4js = require("log4js");

log4js.configure({
    appenders: {
        console: { type: "console" },
        fileBuy: { type: "file", filename: "logs/buy.log" },
        fileWarn: { type: "file", filename: "logs/warn.log" },
        fileError: { type: "file", filename: "logs/error.log" },
    },
    categories: {
        default: { appenders: ["console"], level: "info" },
        warn: { appenders: ["fileWarn", "console"], level: "warn" },
        error: { appenders: ["fileError", "console"], level: "error" },
        buy: { appenders: ["fileBuy", "console"], level: "trace" },
    },
});

const logger = log4js.getLogger();
const loggerWarn = log4js.getLogger("warn");
const loggerError = log4js.getLogger("error");
const loggerBuy = log4js.getLogger("buy");

module.exports = { logger, loggerWarn, loggerError, loggerBuy };