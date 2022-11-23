const { stringToNumber } = require("./stringToNum.js");
const calculate = (...cValues) => {
    // Initalize variables for later
    console.log(cValues);
    let result;
    let index;
    // Loop through the array to do all the operations.
    let i = 0;
    while (i < 500) {
        i++
        index = cValues.findIndex((value) => value === "**"); // Find exponents first
        if (index === -1) {
            index = cValues.findIndex(
                (value) => value === "*" || value === "/" || value === "%" // Finds multiplication, division, and modulus left to right
            );
            if (index === -1) {
                index = cValues.findIndex((value) => value === "+" || value === "-"); // finds addition and subtraction left to right
            }
        }
        switch (cValues[index]) {
            case "*":
                result = cValues[index - 1] * cValues[index + 1];
                break;
            case "/":
                result = cValues[index - 1] / cValues[index + 1];
                break;
            case "%":
                result = cValues[index - 1] % cValues[index + 1];
                break;
            case "+":
                result = cValues[index - 1] + cValues[index + 1];
                break;
            case "-":
                result = cValues[index - 1] - cValues[index + 1];
                break;
            case "**":
                result = cValues[index - 1] ** cValues[index + 1];
                break;
        }

        cValues.splice(index - 1, 1); // Removes first value
        cValues.splice(index, 1); // Removes second value
        cValues[index - 1] = result;
        if (cValues.length === 1) {
            break;
        }
    }
    return parseFloat(cValues);
};

module.exports = { calculate }