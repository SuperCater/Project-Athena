const chalk = require("chalk");

const colors = {
    cError: chalk.bold.red,
    danger: chalk.bold.red,
    warning: chalk.hex("#FFA500"),
    success: chalk.bold.green,
    fullSuccess: chalk.white.bgGreen.bold,
    info: chalk.bold.blue,
}

module.exports = colors