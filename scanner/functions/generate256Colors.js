function generate256Colors(first16Colors) {
    var colors = first16Colors.slice();
    var v = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff];
    for (var i = 0; i < 216; i++) {
        var r = toPaddedHex(v[(i / 36) % 6 | 0]);
        var g = toPaddedHex(v[(i / 6) % 6 | 0]);
        var b = toPaddedHex(v[i % 6]);
        colors.push("#" + r + g + b);
    }
    for (var i = 0; i < 24; i++) {
        var c = toPaddedHex(8 + i * 10);
        colors.push("#" + c + c + c);
    }
    return colors;
}