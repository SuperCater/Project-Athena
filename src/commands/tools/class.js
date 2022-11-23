const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('class')
        .setDescription('Change a developers class.'),
    async execute(interaction, client) {
        interaction.reply({ content: 'This does nothing... yet' });
    },
    type: "GSL",
}
