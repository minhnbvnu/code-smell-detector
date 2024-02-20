function triangle_pin(ctx, i, r, visuals) {
        const h = r * SQ3;
        const a = h / 3;
        const b = 3 * a / 8;
        ctx.moveTo(-r, a);
        ctx.quadraticCurveTo(0, b, r, a);
        ctx.quadraticCurveTo(SQ3 * b / 2, b / 2, 0, a - h);
        ctx.quadraticCurveTo(-SQ3 * b / 2, b / 2, -r, a);
        ctx.closePath();
        visuals.fill.apply(ctx, i);
        visuals.hatch.apply(ctx, i);
        visuals.line.apply(ctx, i);
    }