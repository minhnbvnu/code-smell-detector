function to_char(i) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (i<-1 || i >= 26) {
        throw new Error("ERROR: Invalid conversion to character value, integer '" + i + "' out of range");
    }

    if (i == -1) {
        return "-";
    } else {
        return characters[i];
    }
}