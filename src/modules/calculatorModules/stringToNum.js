const stringToNumber = (str) => {
    console.log(str);
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== "%" && str[i].includes("%")) {
            str[i] = str[i].replace("%", "");
            str[i] = str[i] / 100;
        }
        if (
            str[i] === "+" ||
            str[i] === "-" ||
            str[i] === "*" ||
            str[i] === "/" ||
            str[i] === "%" ||
            str[i] === "**"
        ) {
            str[i] === str[i];
        } else {
            str[i] = parseFloat(str[i]);
        }
    }
    return str;
};

module.exports = { stringToNumber };
