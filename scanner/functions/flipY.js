function flipY(data, width, height) {
    var tmp = new Uint8ClampedArray(width * 4);
    var x, y;
    for (y = 0; y < height / 2; ++y) {
        // copy top line to tmp
        for (x = 0; x < width * 4; ++x) {
            tmp[x] = data[x + y * width * 4];
        }
        data.copyWithin(y * width * 4, (height - y - 1) * width * 4, (height - y) * width * 4);
        // copy tmp to bottom
        for (x = 0; x < width * 4; ++x) {
            data[x + (height - y - 1) * width * 4] = tmp[x];
        }
    }
}