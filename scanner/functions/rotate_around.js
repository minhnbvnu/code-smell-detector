function rotate_around(point, center, angle) {
        if (angle == 0) {
            return point;
        }
        else {
            const tr = new AffineTransform();
            tr.rotate_around(center.x, center.y, angle);
            const [x, y] = tr.apply(point.x, point.y);
            return { x, y };
        }
    }