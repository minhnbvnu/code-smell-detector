function drawCircles(l, x, y, scale) {
        var j, PI_SQ = Math.PI * 2;
        ctx.beginPath();
        for (j = 0; j < l.length; j += 1) {
            ctx.moveTo(x + (l[j].x * scale), y + (l[j].y * scale));
            ctx.arc(x + (l[j].x * scale), y + (l[j].y * scale), 2, 0, PI_SQ, false);
        }
        ctx.closePath();
        ctx.fill();
    }