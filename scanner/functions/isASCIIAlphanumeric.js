function isASCIIAlphanumeric(ch) {
            return (ch >= 0x61 /* 'a' */ && ch <= 0x7A /* 'z' */) ||
                (ch >= 0x41 /* 'A' */ && ch <= 0x5A /* 'Z' */) ||
                (ch >= 0x30 /* '0' */ && ch <= 0x39 /* '9' */);
        }