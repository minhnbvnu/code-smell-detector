function square_x(ctx, i, r, visuals) {
        const size = 2 * r;
        ctx.rect(-r, -r, size, size);
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        ctx.moveTo(-r, r);
        ctx.lineTo(r, -r);
        ctx.moveTo(-r, -r);
        ctx.lineTo(r, r);
        visuals.line.apply(ctx, i);
    }