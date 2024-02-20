function transformLayer(ctx, iCanvas, layer) {
    var m = layer.transform.matrix();

    ctx.translate(iCanvas.width / 2, iCanvas.height / 2);
    ctx.transform(m[0], m[1], m[3], m[4], m[6], m[7]);
    if (layer.flip_h || layer.flip_v) {
        ctx.scale(layer.flip_h ? -1 : 1, layer.flip_v ? -1 : 1);
    }
    ctx.translate(-layer.img.width / 2, -layer.img.height / 2);
}