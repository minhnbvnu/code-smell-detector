function orientation(p, q, r) {
                const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
                if (val === 0) {
                    return 0; // colinear
                }
                // clock or counterclock wise
                return val > 0 ? 1 : 2;
            }