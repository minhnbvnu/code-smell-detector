function _drawLabelsReasonablyFast(painter, dy, n, labeller, boundingWidth) {
    let ctx = painter.ctx;
    ctx.save();
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    painter.ctx.font = '12px monospace';
    let w = Math.max(
        painter.ctx.measureText(labeller(0)).width,
        painter.ctx.measureText(labeller(n-1)).width);
    let h = ctx.measureText("0").width * 2.5;
    let scale = Math.min(Math.min((boundingWidth-2) / w, dy / h), 1);

    // Row labels.
    let step = dy/scale;
    let pad = 1/scale;
    ctx.scale(scale, scale);
    ctx.translate(0, dy*0.5/scale - h*0.5);
    ctx.fillStyle = 'lightgray';
    if (h < step*0.95) {
        for (let i = 0; i < n; i++) {
            ctx.fillRect(0, step*i, w + 2*pad, h);
        }
    } else {
        ctx.fillRect(0, 0, w + 2*pad, step*n);
    }
    ctx.fillStyle = 'black';
    for (let i = 0; i < n; i++) {
        ctx.fillText(labeller(i), pad, h*0.5 + step*i);
    }
    ctx.restore();
}