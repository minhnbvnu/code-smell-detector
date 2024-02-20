function _one_hex(ctx, r) {
        const r2 = r / 2;
        const h = SQ3 * r2;
        ctx.moveTo(r, 0);
        ctx.lineTo(r2, -h);
        ctx.lineTo(-r2, -h);
        ctx.lineTo(-r, 0);
        ctx.lineTo(-r2, h);
        ctx.lineTo(r2, h);
        ctx.closePath();
    }