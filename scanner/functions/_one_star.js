function _one_star(ctx, r) {
        const a = Math.sqrt(5 - 2 * SQ5) * r;
        ctx.moveTo(0, -r);
        ctx.lineTo(a * c72, -r + a * s72);
        ctx.lineTo(a * (1 + c72), -r + a * s72);
        ctx.lineTo(a * (1 + c72 - c36), -r + a * (s72 + s36));
        ctx.lineTo(a * (1 + 2 * c72 - c36), -r + a * (2 * s72 + s36));
        ctx.lineTo(0, -r + a * 2 * s72);
        ctx.lineTo(-a * (1 + 2 * c72 - c36), -r + a * (2 * s72 + s36));
        ctx.lineTo(-a * (1 + c72 - c36), -r + a * (s72 + s36));
        ctx.lineTo(-a * (1 + c72), -r + a * s72);
        ctx.lineTo(-a * c72, -r + a * s72);
        ctx.closePath();
    }