function clipLine(points, bounds, round, noCut) {
    const parts = [];
    let k = 0, segment;
    for (let j = 0, l = points.length; j < l - 1; j++) {
        segment = clipSegment(points[j], points[j + 1], bounds, j, round, noCut);

        if (!segment) { continue; }

        parts[k] = parts[k] || [];
        parts[k].push({
            'point' : segment[0],
            'index' : j
        });

        // if segment goes out of screen, or it's the last one, it's the end of the line part
        if ((segment[1] !== points[j + 1]) || (j === l - 2)) {
            // parts[k].push(segment[1]);
            parts[k].push({
                'point' : segment[1],
                'index' : j + 1
            });
            k++;
        }
    }
    return parts;
}