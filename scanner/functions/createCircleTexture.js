function createCircleTexture(gl, size) {
  size = size || 128;

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  var ctx = canvas.getContext('2d');
  var rad = size * 0.5;

  ctx.beginPath();
  ctx.arc(rad, rad, rad, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = '#fff';
  ctx.fill();

  return GLUtil.createTexture(gl, canvas);
}