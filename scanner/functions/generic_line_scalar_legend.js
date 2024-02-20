function generic_line_scalar_legend(visuals, ctx, { x0, x1, y0, y1 }) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, (y0 + y1) / 2);
        ctx.lineTo(x1, (y0 + y1) / 2);
        visuals.line.apply(ctx);
        ctx.restore();
    }