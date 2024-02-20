function utf8Length(str) {
        var c = 0,
            length = 0;

        for (var i = 0, l = str.length; i < l; i++) {
            c = str.charCodeAt(i);

            if (c < 0x80) {
                length += 1;
            } else if (c < 0x800) {
                length += 2;
            } else if (c < 0xd800 || c >= 0xe000) {
                length += 3;
            } else {
                i++;
                length += 4;
            }
        }

        return length;
    }