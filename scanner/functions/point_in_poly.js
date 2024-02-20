function point_in_poly(x, y, px, py) {
        let inside = false;
        let x1 = px[px.length - 1];
        let y1 = py[py.length - 1];
        for (let i = 0; i < px.length; i++) {
            const x2 = px[i];
            const y2 = py[i];
            if ((y1 < y) != (y2 < y)) {
                if ((x1 + (y - y1) / (y2 - y1) * (x2 - x1)) < x)
                    inside = !inside;
            }
            x1 = x2;
            y1 = y2;
        }
        return inside;
    }