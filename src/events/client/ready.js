const { ActivityType } = require("discord.js");
const responses = ["Yuli with ❤️", "ur mom", "You.", "Discord's API.", "Males", "Females", "Males and Females", "Guys, gals, and and non-binary pals."]
const { fullSuccess } = require("../../modules/color.js")

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const response = responses[Math.floor(Math.random() * responses.length)];
        console.log(fullSuccess(`Logged in as ${client.user.tag} with status ${response}`));
        client.user.setActivity(response, { type: ActivityType.Watching });
    }
}