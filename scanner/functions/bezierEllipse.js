function bezierEllipse(x, y, a, b, b1) {
            const k = 0.5522848,
                ox = a * k,
                oy = b * k,
                oy1 = b1 * k;
            ctx.moveTo(x - a, y);
            ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
            ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
            ctx.bezierCurveTo(x + a, y + oy1, x + ox, y + b1, x, y + b1);
            ctx.bezierCurveTo(x - ox, y + b1, x - a, y + oy1, x - a, y);
            ctx.closePath();
        }