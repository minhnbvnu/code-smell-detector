function spline(xs, ys) {
  const ks = getNaturalKs(xs, ys);
  const maxX = xs[xs.length - 1];
  const allYs = [];
  let i = 1;

  for (let x = 0; x <= maxX; x++) {
    while (xs[i] < x) i++;

    const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
    const a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
    const b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
    const q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
    allYs.push(q);
  }

  return allYs;
}