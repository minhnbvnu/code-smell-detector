function isValidIdentifierChar(ch, first) {
    // check directly for ASCII
    if (ch <= "\u007F") {
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '$' || ch === '_' ||
            (!first && (ch >= '0' && ch <= '9'))) {
            return true;
        }
        return false;
    }

    // create an object to test this in
    var x = {};
    x["x"+ch] = true;
    x[ch] = true;

    // then use eval to determine if it's a valid character
    var valid = false;
    try {
        valid = (Function("x", "return (x." + (first?"":"x") + ch + ");")(x) === true);
    } catch (ex) {}

    return valid;
}