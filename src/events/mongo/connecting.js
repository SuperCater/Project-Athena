const { info } = require('../../modules/color.js');

module.exports = {
    name: 'connecting',
    async execute(client) {
        console.log(info(`Attempting to connect to database...`));
    }
}