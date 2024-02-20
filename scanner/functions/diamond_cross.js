function diamond_cross(ctx, i, r, visuals) {
        _one_diamond(ctx, r);
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        ctx.moveTo(0, r);
        ctx.lineTo(0, -r);
        ctx.moveTo(-r / 1.5, 0);
        ctx.lineTo(r / 1.5, 0);
        visuals.line.apply(ctx, i);
    }