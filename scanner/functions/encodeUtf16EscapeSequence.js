function encodeUtf16EscapeSequence(charCode) {
            const hexCharCode = charCode.toString(16).toUpperCase();
            const paddedHexCode = ("0000" + hexCharCode).slice(-4);
            return "\\u" + paddedHexCode;
        }