const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const {verifyListSchema, verifyModel} = require('../../schemas/verifylist.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifylist')
        .setDescription('Add someone to the GSL verification list.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add someone to the GSL verification list.')
                .addStringOption(option =>
                    option.setName('user')
                        .setDescription('The user id to add to the GSL verification list.')
                        .setRequired(true))
                .addRoleOption(option =>
                    option.setName('role')
                        .setDescription('The role to add to the GSL verification list.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove someone from the GSL verification list.')
                .addStringOption(option =>
                    option.setName('user')
                        .setDescription('The user ID to remove from the GSL verification list.')
                        .setRequired(true))),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getString('user');
        const userToCheck = mongoose.model('verifyList', verifyListSchema, 'verifyList');
        const userO = client.users.cache.get(user)

        if (subcommand === 'add') {
            const role = interaction.options.getRole('role');


            userToCheck.findOne({ userID: user}, async (err, data) => {
                if (err) throw err;
                if (data) {
                    await interaction.reply(`The user: ${userO.tag} is already on the verification list.`);
                } else {
                    const newData = new userToCheck({
                        _id: mongoose.Types.ObjectId(),
                        userID: user,
                        role: interaction.options.getRole('role').id,
                    });
                    newData.save();
                    await interaction.reply(`Added ${userO.tag} to the verification list as ${role}.`);
                }
            })
            
        } else if (subcommand === 'remove') {
            userToCheck.findOneAndDelete({ userID: user }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    await interaction.reply(`Removed ${userO.tag} from the verification list.`);
                } else {
                    await interaction.reply(`The user ${userO.tag} is not on the verification list.`);
                }
            })
        }
    },
    type: "GSL",
}
