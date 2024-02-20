function dist_to_segment_squared(p, v, w) {
        const l2 = dist_2_pts(v, w);
        if (l2 == 0)
            return dist_2_pts(p, v);
        const t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        if (t < 0)
            return dist_2_pts(p, v);
        if (t > 1)
            return dist_2_pts(p, w);
        const q = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
        return dist_2_pts(p, q);
    }