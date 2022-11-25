const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const { verifyListSchema, verifyModel } = require('../../schemas/verifylist.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('Update a users database info')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to add to the database')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('rank')
                .setDescription('The rank of the user')
                .setRequired(true)
                .setChoices(
                    { name: 'Executive', value: 'Executive' },
                    { name: 'Developer', value: 'Developer' },
                    { name: 'Moderator', value: 'Moderator' },
                    { name: "Advisor", value: "Advisor" }))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role of the user')
                .setRequired(true)),

    async execute(interaction) {
        const userToCheck = mongoose.model('verifyList', verifyListSchema, 'verifyList');
        const role = interaction.options.getRole('role');
        const rank = interaction.options.getString('rank');
        const checkUser = interaction.options.getUser('user');


        const user = await userToCheck.findOne({
            userID: interaction.user.id,
        });

        if (!user) {
            console.log('User not found');
            await interaction.reply('User not found');
        } else {
            user.id = checkUser.id;
            user.userName = checkUser.username;
            user.userTag = checkUser.tag;
            user.roleID = role.id;
            user.roleName = role.name;
            user.rank = rank;
            await user.save();


            const added = new EmbedBuilder()
            .setTitle(`Updated ${user.userTag} `)
            .setDescription(`Updated ${user.userTag} `)
            .setThumbnail(checkUser.displayAvatarURL())
            .setFields({
                name: 'User',
                value: `Name: ${user.userName}\nTag: ${user.userTag}\nID: ${user.userID}`,
            },
            {
                name: 'Role',
                value: `Name: ${user.roleName}\nID: ${user.roleID}`,
                },
                {
                    name: 'Rank',
                    value: `${user.rank}`,
                })
            .setColor(0x1a1ca8)
            .setFooter({ text: `Updated by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });


            await interaction.reply({ embeds: [added] });
            // await interaction.reply(`Updated user with\nUserID: ${user.id}\nUserName: ${user.userName}\nUserTag: ${user.userTag}\nRoleID: ${user.roleID}\nRoleName: ${user.roleName}\nRank: ${user.rank}`);
        }
    },
    type: "GSL"
};

