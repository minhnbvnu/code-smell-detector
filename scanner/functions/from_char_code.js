function from_char_code(code) {
            // Based on https://github.com/mathiasbynens/String.fromCodePoint/blob/master/fromcodepoint.js
            if (code > 0xFFFF) {
                code -= 0x10000;
                return (String.fromCharCode((code >> 10) + 0xD800) +
                    String.fromCharCode((code % 0x400) + 0xDC00));
            }
            return String.fromCharCode(code);
        }