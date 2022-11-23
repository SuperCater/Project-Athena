const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge messages.')
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to purge.').setRequired(true)
        .setMinValue(1).setMaxValue(100)),
    async execute(interaction, client) {
        const amount = interaction.options.getInteger('amount');
        if (amount > 100) {
            await interaction.reply("You can only purge up to 100 messages at a time.");
            return;
        }
        await interaction.channel.bulkDelete(amount);
        await interaction.reply(`Purged ${amount} messages.`);
    },
    type: "GLOBAL"
}