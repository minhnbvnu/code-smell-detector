function eval_poly(poly, x) {
        const n = poly.length - 1;
        let y = 0;
        let x_n = 1;
        for (let i = n; i >= 0; i--) {
            y += x_n * poly[i];
            x_n *= x;
        }
        return y;
    }