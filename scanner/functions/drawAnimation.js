function drawAnimation() {
    p.push();
    p.noFill();
    p.stroke(0);

    // draw x oscillator
    p.beginShape();
    for (var i = 0; i <= pointCount; i++){
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      x = p.sin(angle * freqX + p.radians(phi));
      x *= p.width / 4 - margin;
      y = -p.height * 2 / 3 - margin + i / pointCount * (p.height / 2 - 2 * margin);
      p.vertex(x, y);
    }
    p.endShape();

    // draw y oscillator
    p.beginShape();
    for (var i = 0; i <= pointCount; i++){
      angle = p.map(i, 0, pointCount, 0, p.TAU);
      y = p.sin(angle * freqY);
      y *= p.height / 4 - margin;
      x = -p.width * 2 / 3 - margin + i / pointCount * (p.width / 2 - 2 * margin);
      p.vertex(x, y);
    }
    p.endShape();

    angle = p.map(p.frameCount, 0, pointCount, 0, p.TAU);
    x = p.sin(angle * freqX + p.radians(phi));
    y = p.sin(angle * freqY);
    x *= p.width / 4 - margin;
    y *= p.height / 4 - margin;

    var oscYx = -p.width * 2 / 3 - margin + (angle / p.TAU) % 1 * (p.width / 2 - 2 * margin);
    var oscXy = -p.height * 2 / 3 - margin + (angle / p.TAU) % 1 * (p.height / 2 - 2 * margin);

    p.stroke(0,80);
    p.line(x, oscXy, x, y);
    p.line(oscXy, y, x, y);

    p.fill(0);
    p.stroke(255);
    p.strokeWeight(2);

    p.ellipse(x, oscXy, 8, 8);
    p.ellipse(oscYx, y, 8, 8);

    p.ellipse(x, y, 10, 10);

    p.pop();
  }