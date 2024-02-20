function _paintMultiProbabilityDisplay_logarithmHints(args) {
    let {painter, rect: {x, y, w, h}, customStats: probabilities} = args;
    let n = 1 << args.gate.height;
    let d = h / n;
    let e = Math.max(d, 1);

    painter.ctx.save();
    painter.ctx.beginPath();
    painter.ctx.moveTo(x, y);
    let s = 1 / (4 + Math.max(8, args.gate.height));
    for (let i = 0; i < n; i++) {
        let p = probabilities.rawBuffer()[i * 2];
        let px = x + w * Math.min(1, Math.max(0, 1 + Math.log(p) * s));
        let py = y + d * i;
        painter.ctx.lineTo(px, py);
        painter.ctx.lineTo(px, py + e);
    }
    painter.ctx.lineTo(x, y + h);

    painter.ctx.lineWidth = 1;
    painter.ctx.strokeStyle = '#CCC';
    painter.ctx.stroke();
    painter.ctx.restore();
}