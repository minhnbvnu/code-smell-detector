function to_int(c) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (c == "-") {
        return -1;
    } else {
        var index = characters.indexOf(c);
        if (c < 0 || c > 26) {
            throw new Error("ERROR: Invalid conversion to int value, char '" + c + "' out of range");
        }
        return index;
    }
}