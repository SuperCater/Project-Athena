const { SlashCommandBuilder, EmbedBuilder, UserFlagsBitField, UserManager } = require('discord.js');
const { version } = require('../../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gssinfo')
        .setDescription('Get info about the Green Sky Studios version of the bot'),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setTitle("Project Athena GSS Edition Information")
        .setDescription("Information about Project Athena.")
        .setColor(0x2dc617)
        .setThumbnail("https://cdn.discordapp.com/icons/831089104154394634/a_eb9d3634d2e041962f2576146099d4f9.gif?size=100")
        .setTimestamp(Date.now())
        .setFooter({
            text: `Project Athena`,
            iconURL: "https://images-ext-2.discordapp.net/external/ejXeA4CsPq8hvtUgIERDUWrfTJgIq9rsCgNuFzgozY4/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.png?width=676&height=676",
        })
        .addFields([
            {
                name: "***Information***",
                value: "Athena is a Discord bot developed by <@439514395534688257>. It is primarly used for Green Sky Studios but it has public utilities as well."
            },
            {
                name: "***GSS Features***",
                value: "Specific features for GSS include:\n-Easy developer class switching\n-GSL Verification system\nDeveloper Typing\n- and more plus a lot to come."
            },
            {
                name: "***Version***",
                value: version,
            },
            {
                name: "***Github***",
                value: "https://github.com/SuperCater/Project-Athena/tree/main"
            }
        ]);

        await interaction.reply({ embeds: [embed] });
    },
    type: "GSS"
}