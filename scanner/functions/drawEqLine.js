function drawEqLine({
  colorPattern,
  sliders,
  canvasCtx,
  preampLineImage
}) {
  const preampValue = percentToRange(sliders.preamp / 100, 0, GRAPH_HEIGHT - 1);
  canvasCtx.drawImage(preampLineImage, 0, preampValue, preampLineImage.width, preampLineImage.height);
  const amplitudes = BANDS.map(band => sliders[band]);
  canvasCtx.fillStyle = colorPattern;
  const paddingLeft = 2; // TODO: This should be 1.5

  const min = 0;
  const max = GRAPH_HEIGHT - 1;
  const xs = [];
  const ys = [];
  amplitudes.forEach((value, i) => {
    const percent = (100 - value) / 100; // Each band is 12 pixels widex

    xs.push(i * 12);
    ys.push(percentToRange(percent, min, max));
  });
  const allYs = spline(xs, ys);
  const maxX = xs[xs.length - 1];
  let lastY = ys[0];

  for (let x = 0; x <= maxX; x++) {
    const y = clamp(Math.round(allYs[x]), 0, GRAPH_HEIGHT - 1);
    const yTop = Math.min(y, lastY);
    const height = 1 + Math.abs(lastY - y);
    canvasCtx.fillRect(paddingLeft + x, yTop, 1, height);
    lastY = y;
  }
}