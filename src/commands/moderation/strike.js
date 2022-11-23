const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('strike')
        .setDescription('Strike a user.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option.setName('user').setDescription('The user to strike.').setRequired(true)),
    async execute(interaction, client) {
            const user = interaction.options.getUser('user');
            const member = interaction.guild.members.cache.get(user.id);
            const strike1 = interaction.guild.roles.cache.find(role => role.name === "Strike 1");
            const strike2 = interaction.guild.roles.cache.find(role => role.name === "Strike 2");

            if (member.roles.cache.has(strike1.id)) {
                if (member.roles.cache.has(strike2.id)) {
                    await interaction.reply(`This user already has 2 strikes.`);
                } else {
                    member.roles.add(strike2);
                    await interaction.reply(`Striked ${user.username} for the second time.`);
                }
            } else {
                member.roles.add(strike1);
                await interaction.reply(`Striked ${user.username}.`);
            }
    },
    type: "GSL",
}
