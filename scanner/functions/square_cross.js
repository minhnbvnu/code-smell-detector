function square_cross(ctx, i, r, visuals) {
        const size = 2 * r;
        ctx.rect(-r, -r, size, size);
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        _one_cross(ctx, r);
        visuals.line.apply(ctx, i);
    }