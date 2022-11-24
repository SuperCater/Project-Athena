const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js'); // Get permission flags from discord.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permission') // Name
        .setDescription('Requires permission')  // Description
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Pass it in here like so, this requires the administrator perm.
    async execute(interaction) {
        const { roles } = interaction.member
        await interaction.reply({ content: `You have the following roles: ${roles.cache.map(role => role.name).join(', ')}` });
    },
    type: "CDD"
};