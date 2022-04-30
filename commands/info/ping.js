module.exports = {
    name: "ping",
    category: "info",
    permissions: [],
    devOnly: false,
    run: async ({bot, message, args}) => {
        message.reply("Pong")
    }
}