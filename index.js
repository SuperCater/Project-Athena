const Discord = require('discord.js')
require("dotenv").config()

let points = 1

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "c.",
    owners: ["439514395534688257"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
module.exports = bot

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Hello World!")
    }
})

client.on("messageCreate", (message) => {
    if (message.content == "help"){
        message.reply("If you need help just ping a moderator and they will assist you!")
    }
})

client.on("messageCreate", (message) => {
    if (message.content == "points"){
        message.reply(`You have ${points} points!`)
    }
})

client.on("messageCreate", (message) => {
    if (message.content == "test"){
        message.reply("The bot is running!")
    }
})

client.login(process.env.TOKEN)