function alignRight(str, len, ch) {
        return new Array(len - str.length + 1).join(ch || " ") + str;
    }