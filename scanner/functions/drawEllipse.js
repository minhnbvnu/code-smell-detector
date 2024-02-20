function drawEllipse(x,y,a,b,theta,s,e) {
  const ax = 4;
  context.save();
  context.translate(-x,-y);

  const path = new Path2D();
  const p0 = pointInEllipse(a,b,theta,s);
  path.moveTo(p0.x,p0.y);
  for (let tt=s; tt<s+e; tt+=.01) {
    const p = pointInEllipse(a,b,theta,tt);
    path.lineTo(p.x,p.y);
  }

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