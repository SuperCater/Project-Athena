const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('class')
        .setDescription('Change a developers class.')
        .addUserOption(option => option.setName('user').setDescription('The user to change the class of.').setRequired(true))
        .addStringOption(option => option.setName('class').setDescription('The class to change to.').setRequired(true).addChoices(
            {name: "Paid", value: "Paid"},
            {name: "Volunteer", value: "Volunteer"},
        ))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const c = interaction.options.getString('class');

        const paid = interaction.guild.roles.cache.find(role => role.name === "Paid Developer");
        const unpaid = interaction.guild.roles.cache.find(role => role.name === "Volunteer Developer");

        if (c === "Paid" && !member.roles.cache.has(paid.id)) {
            member.roles.remove(unpaid);
            member.roles.add(paid);
            await interaction.reply(`Changed ${user.username}'s class to Paid.`);
        } else {
            await interaction.reply("The user is already in that class.");
        }

        if (c === "Volunteer" && !member.roles.cache.has(unpaid.id)) {
            member.roles.remove(paid);
            member.roles.add(unpaid);
            await interaction.reply(`Changed ${user.username}'s class to Volunteer.`);
        } else {
            await interaction.reply("The user is already in that class.");
        }
    },
    type: "GSL",
}
