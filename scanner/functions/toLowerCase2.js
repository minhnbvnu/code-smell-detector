function toLowerCase2(ch) {
            if (ch >= 65 /* A */ && ch <= 90 /* Z */) {
                return 97 /* a */ + (ch - 65 /* A */);
            }
            if (ch < 127 /* maxAsciiCharacter */) {
                return ch;
            }
            return String.fromCharCode(ch).toLowerCase().charCodeAt(0);
        }