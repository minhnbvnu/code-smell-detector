function drawCircle(x,y,r,angle,f) {
  const ax = 4;
  context.save();
  context.translate(-x,-y);

  const path = new Path2D();
  const x0 = r * Math.cos(angle);
  const y0 = r * Math.sin(angle);
  path.moveTo(x0,y0);
  const sides = 5;
  for (let j=0; j<sides; j++) {
    const a = j * Maf.TAU / sides + angle;
    const a2 = (j+1) * Maf.TAU / sides + angle;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    const x2 = r * Math.cos(a2);
    const y2 = r * Math.sin(a2);
    drawLine(path,x,y,x2,y2,f);
  }
  path.closePath();

  context.translate(-ax,0);
  context.strokeStyle = '#ff0000';
  context.stroke(path);
  context.translate(ax,0);
  context.strokeStyle = '#00ff00';
  context.stroke(path);
  context.translate(ax,0);
  context.strokeStyle = '#0000ff';
  context.stroke(path);

  context.restore();
}