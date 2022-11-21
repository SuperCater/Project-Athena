const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { testClient, testToken } = require('../../../config.json');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
            const { commands, commandArray, cddCommandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                console.log(`Command: ${command.name} has been loaded.`)
                commands.set(command.data.name, command)


                switch (command.type) {
                    case 'GLOBAL':
                        commandArray.push(command.data.toJSON())
                        break;
                    case 'CDD':
                        cddCommandArray.push(command.data.toJSON())
                }
                console.log(`Command: ${command.data.name} has been handled.`)
            }
        }



        const rest = new REST({ version: '10' }).setToken(testToken);
            switch (process.argv[2]) {
                case 'CDD':
                    (async () => {
                        try {
                            console.log('Started refreshing application (/) commands for CDD');
                            await rest.put(
                                Routes.applicationGuildCommands(testClient, "851241760462340176"),
                                { body: client.cddCommandArray },
                            );
                            console.log('Successfully reloaded application (/) commands for CDD');
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    )();
                    break;
                default:
                    (async () => {
                        try {
                            console.log('Started refreshing application (/) commands for all guilds');
                            await rest.put(
                                Routes.applicationCommands(testClient),
                                { body: client.commandArray },
                            );
                            console.log('Successfully reloaded application (/) commands for all guilds');
                        } catch (error) {
                            console.error(error);
                        }
                    })();
                    break;
            }
        }
}