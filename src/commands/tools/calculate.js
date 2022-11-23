const { SlashCommandBuilder } = require("@discordjs/builders");
const { calculate } = require("../../modules/calculatorModules/calculator.js");
const { stringToNumber } = require("../../modules/calculatorModules/stringToNum.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculator")
    .setDescription("Calculate an equation.")
    .addStringOption((option) =>
      option
        .setName("equation")
        .setDescription("The equation to calculate.")
        .setRequired(true)
    ),
  async execute(interaction) {
    let Iequation = interaction.options.getString("equation");
    let equation = Iequation.split(" ");
    equation = stringToNumber(equation);
    await interaction.reply(`${Iequation} reuslts in ${calculate(...equation)}`);
  },
  type: "GLOBAL"
};