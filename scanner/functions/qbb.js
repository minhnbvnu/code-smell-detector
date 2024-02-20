function qbb(x0, y0, cx, cy, x1, y1) {
        function _qbb(u, v, w) {
            if (v == (u + w) / 2)
                return [u, w];
            else {
                const t = (u - v) / (u - 2 * v + w);
                const bd = u * (1 - t) ** 2 + 2 * v * (1 - t) * t + w * t ** 2;
                return [min(u, w, bd), max(u, w, bd)];
            }
        }
        const [x_min, x_max] = _qbb(x0, cx, x1);
        const [y_min, y_max] = _qbb(y0, cy, y1);
        return {
            x0: x_min, x1: x_max,
            y0: y_min, y1: y_max,
        };
    }