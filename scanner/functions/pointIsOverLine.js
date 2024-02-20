function pointIsOverLine(point, linePoints, epsilon, offset, count, size) {
    const x0 = point.x;
    const y0 = point.y;
    // for each segment of the line (j is i -1)
    for (let i = offset + size, j = offset; i < offset + count; j = i, i += size) {
        /* **********************************************************
            norm     : norm of vector P1P2
            distance : distance point P0 to line P1P2
            scalar   : dot product of P1P0 and P1P2 divide by norm, it represents the projection of P0 on the line

            Point is over segment P1P2 if :
                * if the distance, , is inferior to epsilon
                * and if :  -epsilon ≤ scalar ≤ (||P1P2|| +  epsilon)

                            + (P0) _
                            |      |
                            |      |
             <---scalar---->|    distance
                            |      |
                            |      v
             +-------------------------------+
            (P1)                            (P2)
        *********************************************************** */

        const x1 = linePoints[i];
        const y1 = linePoints[i + 1];
        const x2 = linePoints[j];
        const y2 = linePoints[j + 1];

        const Xp = x0 - x1;
        const Yp = y0 - y1;

        const x21 = x2 - x1;
        const y21 = y2 - y1;
        const norm = Math.sqrt(x21 * x21 + y21 * y21);
        const scalar = (Xp * x21 + Yp * y21) / norm;

        if (scalar >= -epsilon && scalar <= norm + epsilon) {
            const distance = Math.abs(y21 * x0 - x21 * y0 + x2 * y1 - y2 * x1) / norm;
            if (distance <= epsilon) {
                return true;
            }
        }
    }

    return false;
}