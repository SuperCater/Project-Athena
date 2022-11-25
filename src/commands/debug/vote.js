const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Start a vote')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message ID to vote on.')
        ),
    async execute(interaction) {
        const messageID = interaction.options.getString('message');

        if (messageID) {
            const message = await interaction.channel.messages.fetch(messageID);
            const thread = await message.startThread({
                name: `Vote - ${interaction.user.tag}`,
                autoArchiveDuration: 1440,
                reason: 'Vote',
            });


            await message.react('👍');
            await message.react('🤷');
            await message.react('👎');

            await thread.send(`Vote started by ${interaction.user.tag}!\n\n${message.content}`);

            await interaction.reply(`Vote started in ${thread}`);
        } else {

        const message = await interaction.reply({ content: `Vote Started by ${interaction.user.tag}`, fetchReply: true });
        const thread = await message.startThread({
            name: `Vote - ${interaction.user.tag}`,
            autoArchiveDuration: 1440,
            reason: 'Vote',
        });

        await message.react('👍');
        await message.react('🤷');
        await message.react('👎');

        await thread.send(`Vote started by ${interaction.user.tag}!`);

        await interaction.followUp(`Vote started in ${thread}`);
    }
    },
    type: "GLOBAL",
}