function _paintMultiProbabilityDisplay_probabilityBars(args) {
    let {painter, rect: {x, y, w, h}, customStats: probabilities} = args;
    let n = 1 << args.gate.height;
    let d = h / n;
    let e = Math.max(d, 1);

    painter.ctx.save();
    painter.ctx.beginPath();
    painter.ctx.moveTo(x, y);
    for (let i = 0; i < n; i++) {
        let p = probabilities.rawBuffer()[i * 2];
        let px = x + w * p;
        let py = y + d * i;
        painter.ctx.lineTo(px, py);
        painter.ctx.lineTo(px, py + e);
    }
    painter.ctx.lineTo(x, y + h);
    painter.ctx.lineTo(x, y);

    painter.ctx.strokeStyle = 'gray';
    painter.ctx.lineWidth = 1;
    painter.ctx.stroke();
    painter.ctx.fillStyle = Config.DISPLAY_GATE_FORE_COLOR;
    painter.ctx.fill();
    painter.ctx.restore();
}