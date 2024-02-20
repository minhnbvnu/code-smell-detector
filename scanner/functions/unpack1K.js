function unpack1K(color, factor) {
    return factor ? bitSh.dot(color) * factor : bitSh.dot(color);
}