function isLowerCaseLetter(ch) {
            if (ch >= 97 /* a */ && ch <= 122 /* z */) {
                return true;
            }
            if (ch < 127 /* maxAsciiCharacter */ || !isUnicodeIdentifierStart(ch, 99 /* Latest */)) {
                return false;
            }
            const str = String.fromCharCode(ch);
            return str === str.toLowerCase();
        }