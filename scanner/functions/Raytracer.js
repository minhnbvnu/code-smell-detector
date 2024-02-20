function Raytracer() {
  var v = gl.getParameter(gl.VIEWPORT);
  var m = gl.modelviewMatrix.m;

  var axisX = new Vector(m[0], m[4], m[8]);
  var axisY = new Vector(m[1], m[5], m[9]);
  var axisZ = new Vector(m[2], m[6], m[10]);
  var offset = new Vector(m[3], m[7], m[11]);
  this.eye = new Vector(-offset.dot(axisX), -offset.dot(axisY), -offset.dot(axisZ));

  var minX = v[0], maxX = minX + v[2];
  var minY = v[1], maxY = minY + v[3];
  this.ray00 = gl.unProject(minX, minY, 1).subtract(this.eye);
  this.ray10 = gl.unProject(maxX, minY, 1).subtract(this.eye);
  this.ray01 = gl.unProject(minX, maxY, 1).subtract(this.eye);
  this.ray11 = gl.unProject(maxX, maxY, 1).subtract(this.eye);
  this.viewport = v;
}