function estimatePathCost(A, B, m) {
        let dx = $Math.abs(A.x - B.x);
        let dy = $Math.abs(A.y - B.y);
        if (map.loop_x) { dx = $Math.min(dx, map.size.x - 1 - dx); }
        if (map.loop_y) { dy = $Math.min(dy, map.size.y - 1 - dy); }
        return dx + dy;
    }