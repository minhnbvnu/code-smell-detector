function inverted_triangle(ctx, i, r, visuals) {
        ctx.rotate(Math.PI);
        _one_tri(ctx, r);
        ctx.rotate(-Math.PI);
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        visuals.line.apply(ctx, i);
    }