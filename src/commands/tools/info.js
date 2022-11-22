const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with Pong!'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Project Athena Information")
        .setDescription("Information about Project Athena.")
        .setColor(0xdc9c0d)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp(Date.now())
        .setFooter({
            text: `Project Athena`,
            iconURL: client.user.displayAvatarURL()
        })
        .addFields([
            {
                name: "Information",
                value: "Athena is a Discord bot developen by Cater. It is primarly used for Green Sky Studios but it has public utilities as well."
            },
            {
                name: "***Version***",
                value: "4.0.0-pre",
            },
        ]);

        await interaction.reply({ embeds: [embed] });
    },
    type: "GLOBAL"
}