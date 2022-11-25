const { cError } = require('../../modules/color.js');

module.exports = {
    name: 'error',
    async execute(error, client) {
        console.log(cError(`Database connection error:\n ${error}`));
        console.error(error)
    }
}