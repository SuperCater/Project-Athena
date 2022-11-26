const { SlashCommandBuilder, Collection, PermissionFlagsBits } = require('discord.js');
const { developerModel } = require('../../schemas/DeveloperChanges.js');
const moment = require('moment');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changes')
        .setDescription('Submit a change to GSS games.')
        .addStringOption(option =>
            option.setName('change')
                .setDescription('The change to submit.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date')
                .setDescription('The date of the change.')
                .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('media')
                .setDescription('The media to submit.')),

    async execute(interaction, client) {
        const change = interaction.options.getString('change');
        const media = interaction.options.getAttachment('media');
        const date = interaction.options.getString('date');
        const member = interaction.member;
        let message

        if (media) {
            message = await interaction.reply({ content: `${interaction.user.tag} submitted the change: ${change}`, fetchReply: true, files: [media] });
        } else {
            message = await interaction.reply({ content: `${interaction.user.tag} submitted the change: ${change}`, fetchReply: true });
        }

        await message.react('✅');
        await message.react('👍');
        await message.react('🤷');
        await message.react('👎');
        await message.react('❌');

        const thread = await message.startThread({
            name: `Change - ${interaction.user.tag} at ${new Date()}`,
            autoArchiveDuration: 1440,
            reason: 'Vote',
        });

        let data;

        if (media) {
        data = new developerModel({
            _id: mongoose.Types.ObjectId(),
            userID: interaction.user.id,
            userName: interaction.user.username,
            userTag: interaction.user.tag,
            change: change,
            date: date,
            media: media.url,
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
            approved: false,
        });
    } else {
        data = new developerModel({
            _id: mongoose.Types.ObjectId(),
            userID: interaction.user.id,
            userName: interaction.user.username,
            userTag: interaction.user.tag,
            change: change,
            date: date,
            media: 'None',
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
            approved: false,
        });
    }
        await data.save();

        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name);
        };

        const collector = message.createReactionCollector({ filter });

        collector.on('collect', async (reaction, user) => {
            if (reaction.emoji.name === '✅' && member.permissions.has(PermissionFlagsBits.Administrator)) {
                await thread.send(`Change approved by ${interaction.user.tag}!`);
                console.log(`Change approved by ${interaction.user.tag}`);
                await developerModel.findOneAndUpdate({ _id: data._id }, { approved: true });
                await interaction.followUp(`Change approved by ${interaction.user.tag}!`);
                thread.setArchived(true);
                collector.stop();
            } else if (reaction.emoji.name === '❌' && member.permissions.has(PermissionFlagsBits.Administrator)) {
                await thread.send(`Change denied by ${interaction.user.tag}!`);
                console.log(`Change denied by ${interaction.user.tag}`);
                await developerModel.findOneAndUpdate({ _id: data._id }, { approved: false });
                await interaction.followUp(`Change denied by ${interaction.user.tag}`);
                thread.setArchived(true);
                collector.stop();
            } else {
                await reaction.users.remove(interaction.user.id);
            }
        });


    },
    type: "GSL",
}