const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gslverification')
        .setDescription('Add someone to the GSL verification list.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add someone to the GSL verification list.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to add to the GSL verification list.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove someone from the GSL verification list.')
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user to remove from the GSL verification list.')
                        .setRequired(true))),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('user');

        if (subcommand === 'add') {
            await interaction.reply({ content: `Added ${user} to the GSL verification list.`});
        } else if (subcommand === 'remove') {
            await interaction.reply({ content: `Removed ${user} from the GSL verification list.`});
        }


        await interaction.followUp({ content: 'This does nothing... yet' });
    },
    type: "GSL",
}
