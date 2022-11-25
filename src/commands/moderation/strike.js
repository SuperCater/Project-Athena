const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('strike')
        .setDescription('Strike a user.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Add a strike to a user.')
            .addUserOption(option => option.setName('user').setDescription('The user to strike.').setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Remove a strike from a user.')
            .addUserOption(option => option.setName('user').setDescription('The user to remove a strike from.').setRequired(true))),


    async execute(interaction, client) {
            const user = interaction.options.getUser('user');
            const member = interaction.guild.members.cache.get(user.id);
            const subcommand = interaction.options.getSubcommand();
            const strike1 = interaction.guild.roles.cache.find(role => role.name === "Strike 1");
            const strike2 = interaction.guild.roles.cache.find(role => role.name === "Strike 2");

            if (subcommand === 'add') {
            if (member.roles.cache.has(strike1.id)) {
                if (member.roles.cache.has(strike2.id)) {
                    await interaction.guild.members.ban(user.id, { reason: "3 Strikes" });
                } else {
                    member.roles.add(strike2);
                    await interaction.reply(`Striked ${user.username} for the second time.`);
                }
            } else {
                member.roles.add(strike1);
                await interaction.reply(`Striked ${user.username}.`);
            }
        } else if (subcommand === 'remove') {
            if (member.roles.cache.has(strike2.id)) {
                member.roles.remove(strike2);
                await interaction.reply(`Removed 2nd strike from ${user.username}.`);
            } else if (member.roles.cache.has(strike1.id)) {
                member.roles.remove(strike1);
                await interaction.reply(`Removed first strike from ${user.username}.`);
            }
        }
    },
    type: "GSL",
}
