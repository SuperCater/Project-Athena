const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('type')
        .setDescription('Change a developers type')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addUserOption(option => option.setName('user').setDescription('The user to make an artist.').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('The role to give the user.').setRequired(true)),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const type = interaction.options.getRole('role');

        if (type.name !== "Artist" && type.name !== "Builder" && type.name !== "Scripter") {
            await interaction.reply("You can only make a user an Artist, Builder, or Scripter.");
        } else {
            const member = interaction.guild.members.cache.get(user.id);
            member.roles.add(type);
            await interaction.reply(`Made ${user.username} a ${type.name}.`);
        }
    },
    type: "GSL",
}