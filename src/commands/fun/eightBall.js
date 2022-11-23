const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eightball') // Name
        .setDescription('Ask a question and see your response.')  // Description
        .addStringOption(option => option.setName('question').setDescription('The question you want to ask.')), // Question
    async execute(interaction, client) {
        const question = interaction.options.getString('question'); // Get the question

        const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'Unlikely',
            'Outlook not so good.',
            'Very doubtful.',
        ]

        let response = responses[Math.floor(Math.random() * responses.length)]; // Get a random response

        if (question) {
            await interaction.reply(`The answer to the question: ${question} is ${response}`); // Reply message
        } else {
            await interaction.reply(response)
        }
    },
};