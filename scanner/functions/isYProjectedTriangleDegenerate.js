function isYProjectedTriangleDegenerate(tri) {
        if (tri.needsUpdate) {
            tri.update();
        }
        return Math.abs(tri.plane.normal.dot(_upVector)) <= EPSILON;
    }