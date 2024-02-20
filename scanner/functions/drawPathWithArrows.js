function drawPathWithArrows(ctx, path) {
    var i, cmd, x1, y1, x2, y2;
    var arrows = [];
    ctx.beginPath();
    for (i = 0; i < path.commands.length; i += 1) {
        cmd = path.commands[i];
        if (cmd.type === 'M') {
            if (x1 !== undefined) {
                arrows.push([ctx, x1, y1, x2, y2]);
            }
            ctx.moveTo(cmd.x, cmd.y);
        } else if (cmd.type === 'L') {
            ctx.lineTo(cmd.x, cmd.y);
            x1 = x2;
            y1 = y2;
        } else if (cmd.type === 'C') {
            ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
            x1 = cmd.x2;
            y1 = cmd.y2;
        } else if (cmd.type === 'Q') {
            ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
            x1 = cmd.x1;
            y1 = cmd.y1;
        } else if (cmd.type === 'Z') {
            arrows.push([ctx, x1, y1, x2, y2]);
            ctx.closePath();
        }
        x2 = cmd.x;
        y2 = cmd.y;
    }
    if (path.fill) {
        ctx.fillStyle = path.fill;
        ctx.fill();
    }
    if (path.stroke) {
        ctx.strokeStyle = path.stroke;
        ctx.lineWidth = path.strokeWidth;
        ctx.fillStyle = path.stroke;
        ctx.stroke();
    }
    arrows.forEach(function (arrow) {
        drawArrow.apply(null, arrow);
    });
}