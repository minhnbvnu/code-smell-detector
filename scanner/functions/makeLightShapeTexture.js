function makeLightShapeTexture(gl) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = CANVAS_SIZE * 4;
  canvas.height = CANVAS_SIZE;

  /*
   *  +-----------+-----------+------------+
   *  | circular  | turn_left | turn_right |
   *  +-----------+-----------+------------+
   */

  // circular (no mask)
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, CANVAS_SIZE * 4, CANVAS_SIZE);

  // left arrow
  ctx.fillStyle = '#444';
  ctx.fillRect(CANVAS_SIZE, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = '#fff';
  drawArrow(ctx, {
    x: CANVAS_SIZE * 1.333,
    y: CANVAS_SIZE / 3,
    size: CANVAS_SIZE / 3,
    strokeWidth: CANVAS_SIZE / 16
  });

  // right arrow
  ctx.fillStyle = '#444';
  ctx.fillRect(CANVAS_SIZE * 2, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = '#fff';
  drawArrow(ctx, {
    x: CANVAS_SIZE * 2.333,
    y: CANVAS_SIZE / 3,
    size: CANVAS_SIZE / 3,
    strokeWidth: CANVAS_SIZE / 16,
    scaleX: -1
  });

  return new Texture2D(gl, {data: canvas});
}