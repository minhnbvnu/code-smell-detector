function bezierCheck(t) {
        if (t >= 0 && t <= 1) {
            var p = pointAt(x1, y1, x2, y2, x3, y3, x4, y4, t);
            if (p.x < minX) {
                minX = p.x;
            } else if (p.x > maxX) {
                maxX = p.x;
            }
            if (p.y < minY) {
                minY = p.y;
            } else if (p.y > maxY) {
                maxY = p.y;
            }
        }
    }