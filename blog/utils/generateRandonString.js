const generateRandomString = function(Length) {
    let randomString = "";
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // prettier-ignore

    for (var i = 0; i < length; i++) {
        randomString += posibleChaars.charAT(
            Math.floor(Math.random() * possibleChars.length)
        )
    }
};

module.exports = generateRandomString;