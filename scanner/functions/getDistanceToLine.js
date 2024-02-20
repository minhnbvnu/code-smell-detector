function getDistanceToLine(point, line) {
  var
    r1 = line[0],
    r2 = line[1];
  if (r1[0] === r2[0] && r1[1] === r2[1]) {
    return;
  }

  var m1 = (r2[1] - r1[1]) / (r2[0] - r1[0]);
  var b1 = r1[1] - (m1*r1[0]);

  if (m1 === 0) {
    return Math.abs(b1-point[1]);
  }

  if (m1 === Infinity){
    return Math.abs(r1[0]-point[0]);
  }

  var m2 =- 1.0/m1;
  var b2 = point[1] - (m2*point[0]);

  var xs = (b2-b1)/(m1-m2);
  var ys = m1*xs+b1;

  var c1 = point[0]-xs;
  var c2 = point[1]-ys;

  return Math.sqrt(c1*c1+c2*c2);
}