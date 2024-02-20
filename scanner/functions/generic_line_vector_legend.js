function generic_line_vector_legend(visuals, ctx, { x0, x1, y0, y1 }, i) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x0, (y0 + y1) / 2);
        ctx.lineTo(x1, (y0 + y1) / 2);
        visuals.line.apply(ctx, i);
        ctx.restore();
    }