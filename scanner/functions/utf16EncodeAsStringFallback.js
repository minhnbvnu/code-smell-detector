function utf16EncodeAsStringFallback(codePoint) {
            Debug.assert(0 <= codePoint && codePoint <= 1114111);
            if (codePoint <= 65535) {
                return String.fromCharCode(codePoint);
            }
            const codeUnit1 = Math.floor((codePoint - 65536) / 1024) + 55296;
            const codeUnit2 = (codePoint - 65536) % 1024 + 56320;
            return String.fromCharCode(codeUnit1, codeUnit2);
        }