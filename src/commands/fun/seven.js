const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('o7')
        .setDescription('Seven-o-seven.'),
    async execute(interaction, client) {
        await interaction.reply('o7');
    },
    type: "GLOBAL",
}
