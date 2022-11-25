const { warning } = require('../../modules/color.js');

module.exports = {
    name: 'disconnected',
    async execute(client) {
        console.log(warning(`Database connection lost.`));
    }
}