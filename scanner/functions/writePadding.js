function writePadding(length) {
    return new type.BinaryString(new Buffer(Array(length + 1).join("\x00")));
}