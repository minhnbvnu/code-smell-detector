function drawPolygon(sides,x,y,r,angle,lineWidth,f) {
  const ax = lineWidth;
  context.save();
  context.translate(-x,-y);
  context.lineWidth = lineWidth;

  const path = new Path2D();
  const x0 = r * Math.cos(angle);
  const y0 = r * Math.sin(angle);
  path.moveTo(x0,y0);
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

  context.translate(-ax,-ax);
  context.strokeStyle = '#dedede';
  context.stroke(path);
  context.translate(2*ax,2*ax);
  context.strokeStyle = '#888';
  context.stroke(path);
  context.translate(-ax,-ax);
  context.strokeStyle = '#ffffff';
  context.stroke(path);

  context.restore();
}