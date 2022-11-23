const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about the bot.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Project Athena Information")
        .setDescription("Information about Project Athena.")
        .setColor(0xdc9c0d)
        .setThumbnail("https://images-ext-2.discordapp.net/external/ejXeA4CsPq8hvtUgIERDUWrfTJgIq9rsCgNuFzgozY4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.png?width=676&height=676")
        .setTimestamp(Date.now())
        .setFooter({
            text: `Project Athena`,
            iconURL: "https://images-ext-2.discordapp.net/external/ejXeA4CsPq8hvtUgIERDUWrfTJgIq9rsCgNuFzgozY4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.png?width=676&height=676"
        })
        .addFields([
            {
                name: "Information",
                value: "Athena is a Discord bot developen by <@439514395534688257>. It is primarly used for Green Sky Studios but it has public utilities as well."
            },
            {
                name: "***Version***",
                value: "4.0.0-pre",
            },
            {
                name: "***Github***",
                value: "https://github.com/SuperCater/Project-Athena/tree/V4"
            }
        ]);

        await interaction.reply({ embeds: [embed] });
    },
    type: "GLOBAL"
}