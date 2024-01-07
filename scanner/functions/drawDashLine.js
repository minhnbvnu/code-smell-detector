function drawDashLine(ctx, startPoint, endPoint, dashArray) {
    //https://davidowens.wordpress.com/2010/09/07/html-5-canvas-and-dashed-lines/
    //
    // Our growth rate for our line can be one of the following:
    //   (+,+), (+,-), (-,+), (-,-)
    // Because of this, our algorithm needs to understand if the x-coord and
    // y-coord should be getting smaller or larger and properly cap the values
    // based on (x,y).
    const fromX = startPoint.x,
        fromY = startPoint.y,
        toX = endPoint.x,
        toY = endPoint.y;
    const pattern = dashArray;
    const lt = function (a, b) {
        return a <= b;
    };
    const gt = function (a, b) {
        return a >= b;
    };
    const capmin = function (a, b) {
        return Math.min(a, b);
    };
    const capmax = function (a, b) {
        return Math.max(a, b);
    };

    const checkX = {
        thereYet: gt,
        cap: capmin
    };
    const checkY = {
        thereYet: gt,
        cap: capmin
    };

    if (fromY - toY > 0) {
        checkY.thereYet = lt;
        checkY.cap = capmax;
    }
    if (fromX - toX > 0) {
        checkX.thereYet = lt;
        checkX.cap = capmax;
    }

    ctx.moveTo(fromX, fromY);
    let offsetX = fromX;
    let offsetY = fromY;
    let idx = 0,
        dash = true;
    let ang, len;
    while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
        ang = Math.atan2(toY - fromY, toX - fromX);
        len = pattern[idx];

        offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
        offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

        if (dash) {
            ctx.lineTo(offsetX, offsetY);
        } else {
            ctx.moveTo(offsetX, offsetY);
        }

        idx = (idx + 1) % pattern.length;
        dash = !dash;
    }
}