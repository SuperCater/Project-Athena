const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName("userInfo")
        .setType(ApplicationCommandType.User),
    async execute(interaction, client) {
        const user = interaction.targetUser;
        await interaction.reply({ content: `User information.\n\n**Username:** ${user.username}\n**Discriminator:** ${user.discriminator}\n**ID:** ${user.id}\n**Avatar:** ${user.displayAvatarURL()}\n***Creation:*** ${user.createdAt}`, ephemeral: true });
    },
    type: "GLOBAL",
}