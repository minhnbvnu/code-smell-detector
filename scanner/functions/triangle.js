function triangle(ctx, i, r, visuals) {
        _one_tri(ctx, r);
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        visuals.line.apply(ctx, i);
    }