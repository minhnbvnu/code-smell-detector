function isLineTriangleEdge(tri, line) {
        // if this is the same line as on the triangle
        const triPoints = tri.points;
        let matches = 0;
        for (let i = 0; i < 3; i++) {
            const { start, end } = line;
            const tp = triPoints[i];
            if (start.distanceToSquared(tp) <= EPSILON) {
                matches++;
            }
            if (end.distanceToSquared(tp) <= EPSILON) {
                matches++;
            }
        }
        return matches >= 2;
    }