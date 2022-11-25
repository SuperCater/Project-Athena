const { SlashCommandBuilder } = require('discord.js');
const { verifyListSchema, verifyModel } = require('../../schemas/verifylist.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself as a GSL member.'),
    async execute(interaction) {
        try {
            const userToCheck = mongoose.model('verifyList', verifyListSchema, 'verifyList');
            const user = interaction.user;
            const member = interaction.member;
            userToCheck.findOne({ userID: user.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    member.roles.add(data.role);
                    const role = interaction.guild.roles.cache.get(data.role);
                    await interaction.reply(`You have been verified as a GSL member with ${role}.`);
                } else {
                    await interaction.reply(`You are not on the verification list.`);
                }
            })
        } catch (err) {
            console.log(err);
            await interaction.editReply('There was an error trying to execute that command!');
        }
    },
    type: "GSL",
}