const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cddtest')
        .setDescription('Test to make sure CDD is working.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({ fetchReply: true });
        const newMessage = `API Latency: ${client.ws.ping}ms\nMessage Latency: ${message.createdTimestamp - interaction.createdTimestamp}ms`;
        await interaction.editReply(newMessage);
    },
    type: "CDD"
}