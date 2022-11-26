const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { verifyListSchema, verifyModel } = require('../../schemas/verifylist.js');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify yourself as a GSL member.'),
    async execute(interaction) {
        try {
            const user = interaction.user;
            const member = interaction.member;

            const modal = new ModalBuilder()
                .setCustomId('gslpass')
                .setTitle('Password')

            const textInput = new TextInputBuilder()
                .setCustomId('gslpassinput')
                .setLabel('Enter the GSL executive password.')
                .setRequired(true)
                .setStyle(TextInputStyle.Short);

            modal.addComponents(
                new ActionRowBuilder()
                    .addComponents(textInput)
            );



            verifyModel.findOne({ userID: user.id }, async (err, data) => {
                if (err) throw err;
                if (data) {

                    switch (data.rank) {
                        case 'Executive':
                            await interaction.showModal(modal);
                            return;
                        case 'Developer':
                            member.roles.add('1017819424440471583');
                            break;
                        case 'Moderator':
                            member.roles.add('1017819117576785990');
                            break;
                        case 'Advisor':
                            member.roles.add('1020642426228056105');
                            break;
                    }

                    member.roles.add(data.roleID);
                    const role = interaction.guild.roles.cache.get(data.roleID);

                    const embed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('Verification Successful')
                        .setThumbnail('https://www.citypng.com/public/uploads/preview/-316225907691vr4nvazfz.png')
                        .setDescription(`You have been verified as a GSL ${data.rank} with the role of ${data.roleName}!`)
                        .setTimestamp()
                        .setFooter({
                            text: 'Athena Verification System',
                            iconURL: 'https://cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.webp'
                        });

                    await interaction.reply({ embeds: [embed] });
                } else {
                    const rejectEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('Verification Failed')
                        .setThumbnail('https://static.vecteezy.com/system/resources/previews/004/752/678/non_2x/cross-mark-in-the-red-square-free-vector.jpg')
                        .setDescription('You are not on the GSL verification list. Please contact a GSL Executive to be added.')
                        .setTimestamp()
                        .setFooter({
                            text: 'Athena Verification System',
                            iconURL: 'https://cdn.discordapp.com/avatars/965076506005082153/8c3cfe99872b8f7e2b0665b4881e6d4a.webp'
                        });
                    await interaction.reply({ embeds: [rejectEmbed] });
                }
            })
        } catch (err) {
            console.log(err);
            await interaction.editReply('There was an error trying to execute that command!');
        }
    },
    type: "GSL",
}