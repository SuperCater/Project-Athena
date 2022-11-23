module.exports = {
    data: {
        name: 'gsladd',
        description: 'add someone to GSL.',
    },
    async execute(interaction, client) {

        await interaction.reply({ content: `Added user to the GSL verification list.` });
    },
}