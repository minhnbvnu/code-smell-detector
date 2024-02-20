function rectIntersect(r1, r2) {
        var right1 = r1.x + r1.width,
            bottom1 = r1.y + r1.height,
            right2 = r2.x + r2.width,
            bottom2 = r2.y + r2.height,

            x = Math.max(r1.x, r2.x),
            y = Math.max(r1.y, r2.y),
            w = Math.max(Math.min(right1, right2) - x, 0),
            h = Math.max(Math.min(bottom1, bottom2) - y, 0);
        return {x: x, y: y, width: w, height: h};
    }