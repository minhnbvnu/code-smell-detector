function plus(ctx, i, r, visuals) {
        const a = 3 * r / 8;
        const b = r;
        const xs = [a, a, b, b, a, a, -a, -a, -b, -b, -a, -a];
        const ys = [b, a, a, -a, -a, -b, -b, -a, -a, a, a, b];
        ctx.beginPath();
        for (let j = 0; j < 12; j++) {
            ctx.lineTo(xs[j], ys[j]);
        }
        ctx.closePath();
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        visuals.line.apply(ctx, i);
    }