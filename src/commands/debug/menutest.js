const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder, SelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('menutest')
        .setDescription('Test the menu.'),
    async execute(interaction, client) {
        const menu = new SelectMenuBuilder()
            .setCustomId("classes-menu")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(new SelectMenuOptionBuilder().setLabel("Paid").setValue("Paid").setDescription("Paid Developer"))
            .addOptions(new SelectMenuOptionBuilder().setLabel("Volunteer").setValue("Volunteer").setDescription("Volunteer Developer"))
            
        await interaction.reply("test");
    }
}

