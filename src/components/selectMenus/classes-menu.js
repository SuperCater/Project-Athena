module.exports = {
    data: {
        name: "classes-menu"
    },
    async execute(interaction, client) {
        const value = interaction.values[0]

        await interaction.reply(`You selected ${value}.`);
    }
}