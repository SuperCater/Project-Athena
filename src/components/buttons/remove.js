module.exports = {
    data: {
        name: 'gslremove',
        description: 'remove someone from GSL.',
    },
    async execute(interaction, client) {
            await interaction.reply({ content: `Removed user from the GSL verification list.` });
        }
}