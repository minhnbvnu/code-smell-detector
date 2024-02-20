function isSurrogate(str, pos) {
            return 0xd800 <= str.charCodeAt(pos) && str.charCodeAt(pos) <= 0xdbff &&
                0xdc00 <= str.charCodeAt(pos + 1) && str.charCodeAt(pos + 1) <= 0xdfff;
        }