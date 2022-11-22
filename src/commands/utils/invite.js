const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get a bot invite.'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({ fetchReply: true });
        const newMessage = `https://discord.com/api/oauth2/authorize?client_id=1044138319715512340&permissions=8&scope=bot%20applications.commands`;
        await interaction.editReply(newMessage);
    },
    type: "GLOBAL"
}