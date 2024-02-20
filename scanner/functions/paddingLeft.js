function paddingLeft(str, len) {
        var pad;
        if (str.length === len) {
            return str;
        }
        pad = new [].constructor((len - str.length) + 1);
        return pad.join('0') + str;
    }