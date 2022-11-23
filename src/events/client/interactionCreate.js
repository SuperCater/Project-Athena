module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            if (!interaction.guild === null) {
            console.log(`Command: ${interaction.commandName} has been executed by ${interaction.user.tag}.`)
            } else {
                console.log(`Command: ${interaction.commandName} has been executed by ${interaction.user.tag} in DMs.`)
            }
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}
        