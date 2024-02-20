function _nearest_line_hit(i, geometry, dx, dy) {
        const p1 = { x: dx[i], y: dy[i] };
        const p2 = { x: dx[i + 1], y: dy[i + 1] };
        const { sx, sy } = geometry;
        const [d1, d2] = (function () {
            if (geometry.type == "span") {
                if (geometry.direction == "h")
                    return [Math.abs(p1.x - sx), Math.abs(p2.x - sx)];
                else
                    return [Math.abs(p1.y - sy), Math.abs(p2.y - sy)];
            }
            // point geometry case
            const s = { x: sx, y: sy };
            const d1 = hittest.dist_2_pts(p1, s);
            const d2 = hittest.dist_2_pts(p2, s);
            return [d1, d2];
        })();
        return d1 < d2 ? [[p1.x, p1.y], i] : [[p2.x, p2.y], i + 1];
    }