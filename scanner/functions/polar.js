function polar(inData, outData, x0, y0, width, height, callback) {
    /* Sets image data based on a polar coordinates filter.
     * The given callback is a function(distance, angle) that returns new [distance, angle].
     */
    x0 = width / 2 + (x0 || 0);
    y0 = height / 2 + (y0 || 0);
    var y1, x1, x, y, d, a, v;
    for (y1 = 0; y1 < height; y1 += 1) {
        for (x1 = 0; x1 < width; x1 += 1) {
            x = x1 - x0;
            y = y1 - y0;
            d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            a = Math.atan2(y, x);
            v = callback(d, a);
            d = v[0];
            a = v[1];
            setPixel(outData, x1 + y1 * width, getPixel(inData,
                Math.round(x0 + Math.cos(a) * d) +
                Math.round(y0 + Math.sin(a) * d) * width
            ));
        }
    }
}