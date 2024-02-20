function project_xsys(xs, ys) {
        const n = min(xs.length, ys.length);
        const merc_xs = new Array(n);
        const merc_ys = new Array(n);
        for (let i = 0; i < n; i++) {
            const [merc_x, merc_y] = project_xy(xs[i], ys[i]);
            merc_xs[i] = merc_x;
            merc_ys[i] = merc_y;
        }
        return [merc_xs, merc_ys];
    }