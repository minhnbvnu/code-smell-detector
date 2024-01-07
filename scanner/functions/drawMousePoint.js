function drawMousePoint(ctx, center) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'yellow';
  ctx.fill();
}