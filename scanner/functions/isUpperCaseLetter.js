function isUpperCaseLetter(ch) {
            if (ch >= 65 /* A */ && ch <= 90 /* Z */) {
                return true;
            }
            if (ch < 127 /* maxAsciiCharacter */ || !isUnicodeIdentifierStart(ch, 99 /* Latest */)) {
                return false;
            }
            const str = String.fromCharCode(ch);
            return str === str.toUpperCase();
        }