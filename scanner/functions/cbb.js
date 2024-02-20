function cbb(x0, y0, cx0, cy0, cx1, cy1, x1, y1) {
        const x3 = x1;
        const y3 = y1;
        x1 = cx0;
        y1 = cy0;
        const x2 = cx1;
        const y2 = cy1;
        const tvalues = [];
        for (let i = 0; i <= 2; i++) {
            let a, b, c;
            if (i == 0) {
                b = 6 * x0 - 12 * x1 + 6 * x2;
                a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
                c = 3 * x1 - 3 * x0;
            }
            else {
                b = 6 * y0 - 12 * y1 + 6 * y2;
                a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
                c = 3 * y1 - 3 * y0;
            }
            if (abs(a) < 1e-12) { // Numerical robustness
                if (abs(b) < 1e-12) // Numerical robustness
                    continue;
                const t = -c / b;
                if (0 < t && t < 1)
                    tvalues.push(t);
                continue;
            }
            const b2ac = b ** 2 - 4 * c * a;
            const sqrtb2ac = sqrt(b2ac);
            if (b2ac < 0)
                continue;
            const t1 = (-b + sqrtb2ac) / (2 * a);
            if (0 < t1 && t1 < 1)
                tvalues.push(t1);
            const t2 = (-b - sqrtb2ac) / (2 * a);
            if (0 < t2 && t2 < 1)
                tvalues.push(t2);
        }
        const n = tvalues.length;
        let j = n;
        const x_bounds = Array(n + 2);
        const y_bounds = Array(n + 2);
        while (j-- > 0) {
            const t = tvalues[j];
            const mt = 1 - t;
            const x = mt ** 3 * x0 + 3 * mt ** 2 * t * x1 + 3 * mt * t ** 2 * x2 + t ** 3 * x3;
            const y = mt ** 3 * y0 + 3 * mt ** 2 * t * y1 + 3 * mt * t ** 2 * y2 + t ** 3 * y3;
            x_bounds[j] = x;
            y_bounds[j] = y;
        }
        x_bounds[n] = x0;
        y_bounds[n] = y0;
        x_bounds[n + 1] = x3;
        y_bounds[n + 1] = y3;
        const [x_min, x_max] = (0, arrayable_1.minmax)(x_bounds);
        const [y_min, y_max] = (0, arrayable_1.minmax)(y_bounds);
        return {
            x0: x_min,
            x1: x_max,
            y0: y_min,
            y1: y_max,
        };
    }