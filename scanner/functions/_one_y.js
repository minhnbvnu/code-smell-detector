function _one_y(ctx, r) {
        const h = r * SQ3;
        const a = h / 3;
        ctx.moveTo(-h / 2, -a);
        ctx.lineTo(0, 0);
        ctx.lineTo(h / 2, -a);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, r);
    }