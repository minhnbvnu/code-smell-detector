function readLinePart(pbf, end, len, closed) {
    var i = 0,
        coords = [],
        p, d;

    var prevP = [];
    for (d = 0; d < dim; d++) prevP[d] = 0;

    while (len ? i < len : pbf.pos < end) {
        p = [];
        for (d = 0; d < dim; d++) {
            prevP[d] += pbf.readSVarint();
            p[d] = prevP[d] / e;
        }
        coords.push(p);
        i++;
    }
    if (closed) coords.push(coords[0]);

    return coords;
}