const { Message } = require("discord.js")

const run = async (client, interaction) => {

    try {
        await interaction.reply("Pong")
    }
    catch(err){
        if (err){
            console.error(err)
            return interaction.reply(`Failed to run pong`)
        }
    }
}

module.exports = {
    name: "ping",
    description: "Ping a member",
    perm: "SEND_MESSAGES",
    run
}