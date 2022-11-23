const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const commandStatuses = require('../../modules/statuses.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get the status of the bot.'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Project Athena Status")
        .setDescription("Status of Project Athena commands")
        .setColor(0xdc9c0d)
        .setThumbnail("https://images-ext-2.discordapp.net/external/ejXeA4CsPq8hvtUgIERDUWrfTJgIq9rsCgNuFzgozY4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.png?width=676&height=676")
        .setFooter({
            text: `Project Athena`,
            iconURL: "https://images-ext-2.discordapp.net/external/ejXeA4CsPq8hvtUgIERDUWrfTJgIq9rsCgNuFzgozY4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.png?width=676&height=676",
        })
        .addFields([
            {
                name: "***GSL***",
                value: `***gssVerification***: ${commandStatuses.gssVerification}\n` +
                `***class***: ${commandStatuses.class}\n` +
                `***protocol***: ${commandStatuses.protocol}`
            },
            {
                name: "***GSS***",
                value: `***gssinfo***: ${commandStatuses.gssinfo}`
            },
            {
                name: "***GLOBAL***",
                value: `***status***: ${commandStatuses.status}\n` +
                `***calculate***: ${commandStatuses.calculate}\n` +
                `***info***: ${commandStatuses.info}\n` +
                `***ping***: ${commandStatuses.ping}\n` +
                `***eightball***: ${commandStatuses.eightball}\n` +
                `***invite***: ${commandStatuses.invite}`
            }
        ]);


        await interaction.reply({ embeds: [embed] });
    },
    type: "GLOBAL"
};