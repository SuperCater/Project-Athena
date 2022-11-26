const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { verifyListSchema, verifyModel } = require('../../schemas/verifylist.js');
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
                        .setRequired(true))
                .addStringOption(option =>
                    option.setName('rank')
                        .setDescription('The rank of the user')
                        .setRequired(true)
                        .setChoices(
                            { name: 'Executive', value: 'Executive' },
                            { name: 'Developer', value: 'Developer' },
                            { name: 'Moderator', value: 'Moderator' },
                            { name: "Advisor", value: "Advisor" })))
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
        const userToCheck = verifyModel
        const userO = client.users.cache.get(user)

        if (subcommand === 'add') {
            const role = interaction.options.getRole('role');
            const rank = interaction.options.getString('rank');


            userToCheck.findOne({ userID: user }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    await interaction.reply(`The user: ${userO.tag} is already on the verification list.`);
                } else {
                    const newData = new userToCheck({
                        _id: mongoose.Types.ObjectId(),
                        userID: user,
                        roleID: interaction.options.getRole('role').id,
                        roleName: interaction.options.getRole('role').name,
                        rank: rank,
                        strikes: 0
                    });
                    newData.save();
                    await interaction.reply(`Added ${userO.tag} to the verification list as ${role} as an ${rank}.`);
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
