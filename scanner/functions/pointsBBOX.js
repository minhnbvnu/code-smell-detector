function pointsBBOX(points, out) {
    if (!points) {
        return;
    }
    if (Array.isArray(points[0])) {
        for (let i = 0, len = points.length; i < len; i++) {
            pointsBBOX(points[i], out);
        }
    } else if (Array.isArray(points)) {
        for (let i = 0, len = points.length; i < len; i++) {
            const { x, y } = points[i];
            out[0] = Math.min(x, out[0]);
            out[1] = Math.min(y, out[1]);
            out[2] = Math.max(x, out[2]);
            out[3] = Math.max(y, out[3]);
        }
    } else {
        const { x, y } = points;
        out[0] = Math.min(x, out[0]);
        out[1] = Math.min(y, out[1]);
        out[2] = Math.max(x, out[2]);
        out[3] = Math.max(y, out[3]);
    }
}