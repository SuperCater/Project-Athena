const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("avatar")
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        await interaction.reply({ content: interaction.targetUser.displayAvatarURL(), ephemeral: true });
    },
    type: "GLOBAL",
}