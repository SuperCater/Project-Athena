const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false)
        .addUserOption(option => option.setName("user").setDescription("The user to ban.").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("The reason for the ban.").setRequired(false)),
    async execute(interaction, client) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        if (user.id === interaction.user.id) {
            await interaction.reply("You can't ban yourself.");
            return;
        }
        if (user.id === client.user.id) {
            await interaction.reply("You can't ban me.");
            return;
        }
        if (user.id === interaction.guild.ownerId) {
            await interaction.reply(`You can't ban ${user.tag} the server owner.`);
            return;
        }

        const member = await interaction.guild.members.fetch(user.id);
        if (member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            await interaction.reply(`You can't ban ${user.tag} because they're a moderator.`);
            return;
        }

        await interaction.guild.members.ban(user.id, { reason: reason });
        await interaction.reply(`Banned ${user.tag} for ${reason}.`);
    },
    type: "GLOBAL"
};
