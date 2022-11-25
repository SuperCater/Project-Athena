const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { verifyListSchema, verifyModel } = require('../../schemas/verifylist.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('forceverify')
        .setDescription('Verify someone else as a GSL member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to verify.')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const userToCheck = mongoose.model('verifyList', verifyListSchema, 'verifyList');
            const user = interaction.options.getUser('user');
            const member = interaction.guild.members.cache.get(user.id);
            userToCheck.findOne({ userID: user.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    member.roles.add(data.role);
                    const role = interaction.guild.roles.cache.get(data.role);
                    await interaction.reply(`You have verified ${user.tag} as a GSL member with ${role}.`);
                } else {
                    await interaction.reply(`${user} is not on the verification list.`);
                }
            })
        } catch (err) {
            console.log(err);
            await interaction.editReply('There was an error trying to execute that command!');
        }
    },
    type: "GSL",
}