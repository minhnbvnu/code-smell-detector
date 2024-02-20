function content(j) {
        var x = j * type;
        return Buffer([x & 0x7F, (x + 1) & 0x7F]);
    }