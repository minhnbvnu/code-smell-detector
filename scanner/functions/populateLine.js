function populateLine(coords, line, closed) {
    var i, j,
        len = line.length - (closed ? 1 : 0),
        sum = new Array(dim);
    for (j = 0; j < dim; j++) sum[j] = 0;
    for (i = 0; i < len; i++) {
        for (j = 0; j < dim; j++) {
            var n = Math.round(line[i][j] * e) - sum[j];
            coords.push(n);
            sum[j] += n;
        }
    }
}