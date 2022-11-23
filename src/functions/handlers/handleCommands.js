const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { testClient, testToken } = require("../../../config.json");

const rest = new REST({ version: "10" }).setToken(testToken);

const deployToGuild = async (guildId, commandData) => {
  try {
    console.log("Started refreshing application (/) commands for guild " + guildId + ".");
    await rest.put(
      Routes.applicationGuildCommands(testClient, guildId),
      { body: commandData },
    );
    console.log("Successfully reloaded application (/) commands for guild " + guildId + ".");
  } catch (error) {
    console.error(error);
  }
};

const deployToGlobal = async (commandData) => {
  try {
    console.log("Started refreshing application (/) commands for global.");
    await rest.put(
      Routes.applicationCommands(testClient),
      { body: commandData },
    );
    console.log("Successfully reloaded application (/) commands for global.");
  } catch (error) {
    console.error(error);
  }
};


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
          console.log(`Command ${command.data.name} failed to include a type, defaulting to GLOBAL.`);
          commandArray.push(command.data.toJSON());
        } else {
          console.log(`Command: ${command.data.name} has been handled as a ${command.type} command. Loaded from the ${folder}`);
        }
      }
    }

    if (process.argv[2] === "delete") {
      console.log("Deleting all commands.");
      client.cddCommandArray = [];
      client.gslCommandArray = [];
      client.gssCommandArray = [];
      client.commandArray = [];
      console.log("All commands deleted.");
    }
    if (process.argv[2] === "deploy" || process.argv[2] === "delete" || process.argv[2] === "full") {
    deployToGuild("851241760462340176", client.cddCommandArray);
    deployToGuild("1017818009475239946", client.gslCommandArray)
    deployToGlobal(client.commandArray)
    console.log("All commands have been deployed.")
    if (process.argv[2] !== "full") {
      process.exit(0);
    }
    }
  };
};
