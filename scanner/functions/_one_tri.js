function _one_tri(ctx, r) {
        const h = r * SQ3;
        const a = h / 3;
        ctx.moveTo(-r, a);
        ctx.lineTo(r, a);
        ctx.lineTo(0, a - h);
        ctx.closePath();
    }