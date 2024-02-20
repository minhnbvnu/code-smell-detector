function _one_dot(ctx, r) {
        ctx.beginPath();
        ctx.arc(0, 0, r / 4, 0, 2 * Math.PI, false);
        ctx.closePath();
    }