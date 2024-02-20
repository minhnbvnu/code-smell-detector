function getColor(value, domain) {
  const h = lerp(180, 0, clamp((value - domain[0]) / (domain[1] - domain[0]), 0, 1));
  return Color.hsl(h, 100, 50)
    .rgb()
    .array();
}