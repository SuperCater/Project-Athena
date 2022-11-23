const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { testClient, testToken } = require("../../../config.json");
const chalk = require("chalk");

const cError = chalk.bold.red;
const danger = chalk.bold.red;
const warning = chalk.hex("#FFA500");
const success = chalk.bold.green;
const fullSuccess = chalk.white.bgGreen.bold;
const info = chalk.bold.blue;

const rest = new REST({ version: "10" }).setToken(testToken);

const deployToGuild = async (guildId, commandData, client) => {
  try {
    const guild = await client.guilds.fetch(guildId)
    console.log(info(`Started refreshing application (/) commands for ${guild.name}. ID: ${guild.id}`));
    await rest.put(
      Routes.applicationGuildCommands(testClient, guildId),
      { body: commandData },
    );
    console.log(success(`Successfully reloaded ${commandData.length} application (/) commands for guild ${guild.name}. ID: ${guild.id}`));
  } catch (error) {
    console.error(error);
  }
};

const deployToGlobal = async (commandData) => {
  try {
    console.log(info("Started refreshing application (/) commands for global."));
    await rest.put(
      Routes.applicationCommands(testClient),
      { body: commandData },
    );
    console.log(success(`Successfully reloaded ${commandData.length} application (/) commands for global.`));
  } catch (error) {
    console.error(error);
  }
};

const allCommands = []


module.exports = async (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      const { commands, commandArray, cddCommandArray, gslCommandArray, gssCommandArray } =
        client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);

        commands.set(command.data.name, command);

        const allCommandData = {
          name: command.data.name,
          type: command.type,
        }

        allCommands.push(allCommandData)
        switch (command.type) {
          case "GLOBAL":
            commandArray.push(command.data.toJSON());
            break;
          case "CDD":
            cddCommandArray.push(command.data.toJSON());
            break;
          case "GSL":
            gslCommandArray.push(command.data.toJSON());
            cddCommandArray.push(command.data.toJSON());
            break;
          case "GSS":
            gslCommandArray.push(command.data.toJSON());
            cddCommandArray.push(command.data.toJSON());
            gssCommandArray.push(command.data.toJSON());
        }
        if (command.type === undefined) {
          console.log(warning(`Command ${command.data.name} failed to include a type, defaulting to GLOBAL.`));
          commandArray.push(command.data.toJSON());
        } else {
          console.log(success(`Command: ${command.data.name} has been handled as a ${command.type} command. Loaded from the ${folder}`));
        }
      }
    }

    if (process.argv[2] === "delete") {
      console.log(danger("Deleting all commands."));
      client.cddCommandArray = [];
      client.gslCommandArray = [];
      client.gssCommandArray = [];
      client.commandArray = [];
      console.log(fullSuccess("All commands deleted."));
    }
    if (process.argv[2] === "deploy" || process.argv[2] === "delete" || process.argv[2] === "full") {
      await deployToGuild("851241760462340176", client.cddCommandArray, client); // CDD
      await deployToGuild("1017818009475239946", client.gslCommandArray, client) // GSL
      // deployToGuild("831089104154394634", client.gssCommandArray, client) // ! GSS, disabled during testing.
      await deployToGlobal(client.commandArray) // GLOBAL
      console.log(fullSuccess("All commands have been deployed."))

      console.log(info("Successfully deployed commands:"));
      console.table(allCommands)

      if (process.argv[2] !== "full") {
        console.log(fullSuccess("Exiting process."))
        process.exit(0);
      }
    }
  };
};
