const { token } = require('../config.json');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
]});
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();


client.commandArray = [];
client.gssCommandArray = [];
client.cddCommandArray = [];
client.gslCommandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}


client.login(token);
client.handleEvents();
client.handleComponents();
client.handleCommands();