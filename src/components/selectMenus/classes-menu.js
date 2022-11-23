module.exports = {
    data: {
        name: "classes-menu"
    },
    async execute(interaction, client) {
        await interaction.reply(`You selects ${interaction.values[0]}`);
    }
}