function circle_y(ctx, i, r, visuals) {
        ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        _one_y(ctx, r);
        visuals.line.apply(ctx, i);
    }