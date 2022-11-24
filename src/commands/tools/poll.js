const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Start a poll')
        .addStringOption(option => option.setName('question').setDescription('The question to ask').setRequired(true)),
    async execute(interaction, client) {
        const question = interaction.options.getString('question');

        // const thumb1 = client.emojis.cache.find(emoji => emoji.id === '1045137454140756063');
        // const thumb2 = client.emojis.cache.find(emoji => emoji.id === '1045137542456025128');

        const message = await interaction.reply({ content: `**${question}**`, fetchReply: true });


        // console.log(thumb1);

        await message.react("👍");
        await message.react("👎");

        const filter = (reaction, user) => {
            return reaction.emoji.name === '👍'
        }


        const collector = message.createReactionCollector(filter);

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    },
    type: "GLOBAL"
};
