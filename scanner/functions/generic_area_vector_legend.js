function generic_area_vector_legend(visuals, ctx, { x0, x1, y0, y1 }, i) {
        var _a, _b;
        const w = Math.abs(x1 - x0);
        const dw = w * 0.1;
        const h = Math.abs(y1 - y0);
        const dh = h * 0.1;
        const sx0 = x0 + dw;
        const sx1 = x1 - dw;
        const sy0 = y0 + dh;
        const sy1 = y1 - dh;
        ctx.beginPath();
        ctx.rect(sx0, sy0, sx1 - sx0, sy1 - sy0);
        visuals.fill.apply(ctx, i);
        (_a = visuals.hatch) === null || _a === void 0 ? void 0 : _a.apply(ctx, i);
        (_b = visuals.line) === null || _b === void 0 ? void 0 : _b.apply(ctx, i);
    }