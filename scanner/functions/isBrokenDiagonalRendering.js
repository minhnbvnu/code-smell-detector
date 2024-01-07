function isBrokenDiagonalRendering() {
  if (brokenDiagonalRendering_ === undefined) {
    const ctx = createCanvasContext2D(6, 6, canvasPool);
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgba(210, 0, 0, 0.75)';
    drawTestTriangle(ctx, 4, 5, 4, 0);
    drawTestTriangle(ctx, 4, 5, 0, 5);
    const data = ctx.getImageData(0, 0, 3, 3).data;
    brokenDiagonalRendering_ =
      verifyBrokenDiagonalRendering(data, 0) ||
      verifyBrokenDiagonalRendering(data, 4) ||
      verifyBrokenDiagonalRendering(data, 8);
    releaseCanvas(ctx);
    canvasPool.push(ctx.canvas);
  }

  return brokenDiagonalRendering_;
}