function atobReplacer(encoded) {
        var codePoint = encoded.charCodeAt(0) << 24;
        var leadingOnes = clz32(~codePoint);
        var endPos = 0,
            stringLen = encoded.length;
        var result = "";
        if (leadingOnes < 5 && stringLen >= leadingOnes) {
            codePoint = (codePoint << leadingOnes) >>> (24 + leadingOnes);
            for (endPos = 1; endPos < leadingOnes; ++endPos)
                codePoint = (codePoint << 6) | (encoded.charCodeAt(endPos) & 0x3f /*0b00111111*/);
            if (codePoint <= 0xFFFF) { // BMP code point
                result += fromCharCode(codePoint);
            } else if (codePoint <= 0x10FFFF) {
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                result += fromCharCode(
                    (codePoint >> 10) + 0xD800, // highSurrogate
                    (codePoint & 0x3ff) + 0xDC00 // lowSurrogate
                );
            } else endPos = 0; // to fill it in with INVALIDs
        }
        for (; endPos < stringLen; ++endPos) result += "\ufffd"; // replacement character
        return result;
    }