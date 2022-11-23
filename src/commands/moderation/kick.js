const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDMPermission(false)
        .addUserOption(option => option.setName('user').setDescription('The user to kick.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason for the kick.').setRequired(false)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        if (user.id === interaction.user.id) {
            await interaction.reply("You can't kick yourself.");
            return;
        }
        if (user.id === client.user.id) {
            await interaction.reply("You can't kick me.");
            return;
        }
        if (user.id === interaction.guild.ownerId) {
            await interaction.reply(`You can't kick ${user.tag} the server owner.`);
            return;
        }

        const member = await interaction.guild.members.fetch(user.id);
        if (member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            await interaction.reply(`You can't kick ${user.tag} because they're a moderator.`);
            return;
        }

        await interaction.guild.members.kick(user.id, { reason: reason });
        await interaction.reply(`Kicked ${user.tag} for ${reason}.`);
    },
    type: 'GLOBAL'
};