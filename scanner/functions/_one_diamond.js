function _one_diamond(ctx, r) {
        ctx.moveTo(0, r);
        ctx.lineTo(r / 1.5, 0);
        ctx.lineTo(0, -r);
        ctx.lineTo(-r / 1.5, 0);
        ctx.closePath();
    }