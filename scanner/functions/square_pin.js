function square_pin(ctx, i, r, visuals) {
        const a = 3 * r / 8;
        ctx.moveTo(-r, -r);
        /* eslint-disable space-in-parens */
        ctx.quadraticCurveTo(0, -a, r, -r);
        ctx.quadraticCurveTo(a, 0, r, r);
        ctx.quadraticCurveTo(0, a, -r, r);
        ctx.quadraticCurveTo(-a, 0, -r, -r);
        /* eslint-ensable space-in-parens */
        ctx.closePath();
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        visuals.line.apply(ctx, i);
    }