function asterisk(ctx, i, r, visuals) {
        _one_cross(ctx, r);
        _one_x(ctx, r);
        visuals.line.apply(ctx, i);
    }