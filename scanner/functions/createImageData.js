function createImageData(ctx, width, height) {
    if (ctx.createImageData) {
        return ctx.createImageData(width, height);
    } else {
        return ctx.getImageData(0, 0, width, height);
    }
}