function drawLissajous() {
    p.background(255);
    p.strokeWeight(lineWeight);
    p.push();
    p.translate(p.width / 2, p.height / 2);

    for (var i1 = 0; i1 < pointCount; i1++) {
      for (var i2 = 0; i2 < i1; i2++) {
        var d = lissajousPoints[i1].dist(lissajousPoints[i2]);
        var a = p.pow(1 / (d / connectionRadius + 1), 6);
        if (d <= connectionRadius) {
          p.stroke(lineColor, a * lineAlpha);
          p.line(
            lissajousPoints[i1].x,
            lissajousPoints[i1].y,
            lissajousPoints[i2].x,
            lissajousPoints[i2].y
          );
        }
      }
    }
    p.pop();
  }