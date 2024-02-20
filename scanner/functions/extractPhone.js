function extractPhone(msg) {
    var phones = msg.match(phoneRegex());
    if (!phones || phones.length == 0) return undefined;
    return _.first(phones).trim();
}