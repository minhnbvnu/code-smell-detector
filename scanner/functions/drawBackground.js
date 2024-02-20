function drawBackground(c1, c2, steps) {
  let y = 0;
  let yStep = Math.floor(K_PROJECT_HEIGHT / steps);

  for (let i = 0; i < steps; i += 1) {
    const c = Phaser.Color.interpolateColor(c1, c2, steps, i);

    backgroundBMD.rect(
      0,
      y,
      K_PROJECT_WIDTH,
      y + yStep,
      Phaser.Color.getWebRGB(c)
    );

    y += yStep;
  }
}