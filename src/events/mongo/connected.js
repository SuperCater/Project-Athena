const { fullSuccess } = require('../../modules/color.js');

module.exports = {
    name: 'connected',
    async execute(client) {
        console.log(fullSuccess(`Database connection established.`));
    }
}