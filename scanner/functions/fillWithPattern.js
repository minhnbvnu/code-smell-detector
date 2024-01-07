function fillWithPattern(p1, p2) {
            const degree = computeDegree(p1.x, p1.y, p2.x, p2.y);
            ctx.save();
            const cosd = Math.cos(degree);
            if (Math.abs(cosd) < 1E-7) {
                //a vertical line
                ctx.translate(p1.x - ctx.lineWidth / 2, p1.y);
            } else {
                ctx.translate(p1.x, p1.y - ctx.lineWidth / 2 / cosd);
            }
            ctx.rotate(degree);
            Canvas._stroke(ctx, lineOpacity);
            ctx.restore();
        }