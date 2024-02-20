function utf8ToAB(utf8_str) {
        var buf = new ArrayBuffer(utf8_str.length); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = utf8_str.length; i < strLen; i++) {
            bufView[i] = utf8_str.charCodeAt(i);
        }
        return buf;
    }