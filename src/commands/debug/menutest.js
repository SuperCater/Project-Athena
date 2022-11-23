const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menutest')
        .setDescription('Test the menu.')
        .addUserOption(option => option.setName('user').setDescription('The user to get the IP of.').setRequired(true)),
    async execute(interaction, client) {
        const menu = new SelectMenuBuilder()
            .setCustomId("classes-menu")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(
                {
                    label: "Paid",
                    value: "Paid",
                    description: "Paid Developer",
                },
                {
                    label: "Volunteer",
                    value: "Volunteer",
                    description: "Volunteer Developer",
                });

            
        await interaction.reply({
            content: "Select a class.",
            components: [new ActionRowBuilder().addComponents(menu)],
        });
    },
    type: "CDD",
}

