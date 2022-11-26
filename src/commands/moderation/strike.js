const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { verifyListSchema, verifyModel } = require('../../schemas/verifylist.js');
const mongoose = require('mongoose');

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

        const userDataInit = await mongoose.model('verifyList', verifyListSchema, 'verifyList');
        const userData = await userDataInit.findOne({ userID: user.id })

        if (subcommand === 'add') {
            console.log(userData)
            if (userData.strikes === 0) {
                await member.roles.add(strike1);
                userData.strikes = 1;
                await userData.save();
            } else if (userData.strikes === 1) {
                await member.roles.add(strike2);
                userData.strikes = 2;
                await userData.save();
            } else if (userData.strikes === 2) {
                await member.ban({ reason: '3 strikes.' });
                userData.strikes = 3;
                await userData.save();
            } else if (userData.strikes === 3) {
                interaction.reply('User strikes are already at 3.');
                await userData.save();
            }

            console.log(userData)

            await interaction.reply(`Added a strike to ${user.tag}. User is now at ${userData.strikes} strikes.`);


        } else if (subcommand === 'remove') {
            if (userData.strikes === 1) {
                await member.roles.remove(strike1);
                userData.strikes = 0;
                await userData.save();
            } else if (userData.strikes === 2) {
                await member.roles.remove(strike2);
                userData.strikes = 1;
                await userData.save();
            } else if (userData.strikes === 0) {
                await interaction.reply('User strikes are already at 0.');
                await userData.save();
            }

            await interaction.reply(`Removed a strike from ${userData.userName}. User is now at ${userData.strikes} strikes.`);
        }
    },
    type: "GSL",
}
