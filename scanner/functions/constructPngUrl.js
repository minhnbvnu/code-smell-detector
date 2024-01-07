function constructPngUrl(data, width, height) {
    var row = function (data, width, y) {
        var result = "\0";
        var r = y * width * 4;
        for (var x = 0; x < width; x++) {
            result += String.fromCharCode(data[r], data[r + 1], data[r + 2], data[r + 3]);
            r += 4;
        }
        return result;
    };

    var rows = function (data, width, height) {
        var result = "";
        for (var y = 0; y < height; y++)
            result += row(data, width, y);
        return result;
    };

    var adler = function (data) {
        var s1 = 1, s2 = 0;
        for (var i = 0; i < data.length; i++) {
            s1 = (s1 + data.charCodeAt(i)) % 65521;
            s2 = (s2 + s1) % 65521;
        }
        return s2 << 16 | s1;
    };

    var hton = function (i) {
        return String.fromCharCode(i >>> 24, i >>> 16 & 255, i >>> 8 & 255, i & 255);
    };

    var deflate = function (data) {
        var compressed = "\x78\x01";
        var i = 0;
        do {
            var block = data.slice(i, i + 65535);
            var len = block.length;
            compressed += String.fromCharCode(
                ((i += block.length) === data.length) << 0,
                len & 255, len >>> 8, ~len & 255, (~len >>> 8) & 255);
            compressed += block;
        } while (i < data.length);
        return compressed + hton(adler(data));
    };

    var crc32 = function (data) {
        var c = ~0;
        for (var i = 0; i < data.length; i++)
            for (var b = data.charCodeAt(i) | 0x100; b !== 1; b >>>= 1)
                c = (c >>> 1) ^ ((c ^ b) & 1 ? 0xedb88320 : 0);
        return ~c;
    };

    var chunk = function (type, data) {
        return hton(data.length) + type + data + hton(crc32(type + data));
    };

    var png = "\x89PNG\r\n\x1a\n" +
        chunk("IHDR", hton(width) + hton(height) + "\x08\x06\0\0\0") +
        chunk("IDAT", deflate(rows(data, width, height))) +
        chunk("IEND", "");

    return "data:image/png;base64," + btoa(png);
}