function Letter(char, x, y) {
  this.char = char;
  this.x = x;
  this.y = y;

  Letter.prototype.draw = function() {
    var path = font.textToPoints(this.char, this.x, this.y, fontSize, {sampleFactor: pathSampleFactor});
    stroke(shapeColor);

    for (var d = 0; d < ribbonWidth; d += density) {
      beginShape();

      for (var i = 0; i < path.length; i++) {
        var pos = path[i];
        var nextPos = path[i + 1];

        if (nextPos) {
          var p0 = createVector(pos.x, pos.y);
          var p1 = createVector(nextPos.x, nextPos.y);
          var v = p5.Vector.sub(p1, p0);
          v.normalize();
          v.rotate(HALF_PI);
          v.mult(d);
          var pneu = p5.Vector.add(p0, v);
          curveVertex(pneu.x, pneu.y);
        }
      }

      endShape(CLOSE);
    }
  };
}