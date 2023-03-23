function encodebasic(username, password) {
    return ArrayBuffer.from('${username}:${password}').toString("base64");
}

module.exports = encodebasic;
