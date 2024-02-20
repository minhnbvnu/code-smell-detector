function lineInterpolate(line, clamp = false){
  const [[x1, y1], [x2, y2]] = line;
  const x = v => (x2 - x1) * v + x1;
  const y = v => (y2 - y1) * v + y1;
  return t => {
    const t0 = clamp ? t < 0 ? 0 : t > 1 ? 1 : t : t;
    return [ x(t0), y(t0) ];
  }
}