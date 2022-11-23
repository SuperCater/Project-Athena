const { info } = require('../../modules/color.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            if (interaction.guild.name !== null) {
                console.log(info(`Command: ${interaction.commandName} has been executed by ${interaction.user.tag} in ${interaction.guild.name} ID: (${interaction.guild.id}`));
            } else {
                console.log(info(`Command: ${interaction.commandName} has been executed by ${interaction.user.tag} in DMs.`))
            }
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client
            const { customId } = interaction
            const button = buttons.get(customId)
            if (!button) return new Error("Button code error");

            try {
                await button.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
            }
        }
    }
}
