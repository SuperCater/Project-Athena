const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Bot will reply if the bot is running'),
    async execute(interaction) {
        await interaction.reply('The bot is running');
    },
};