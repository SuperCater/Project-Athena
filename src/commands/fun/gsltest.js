const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gsltest')
        .setDescription('Test to make sure GSL is working.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({ fetchReply: true });
        const newMessage = `GSL commands working.`;
        await interaction.editReply(newMessage);
    },
    type: "GSL"
}