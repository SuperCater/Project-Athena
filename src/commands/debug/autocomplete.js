const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autocomplete') // Name
        .setDescription('autocomplete test')// Description
        .addStringOption(option =>
            option.setName("color")
                .setDescription("A color")
                .setAutocomplete(true)
                .setRequired(true)
        ),
    async autocomplete(interaction, client) {
        const focusedValue = interaction.options.getFocused()
        const choices = ["red", "green", "blue", "orange", "yellow"];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue.value))

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        )
    },
    async execute(interaction, client) {
        const option = interaction.options.getString("color")
        await interaction.reply(`You chose ${option}`)
    },
    type: "CDD"
};