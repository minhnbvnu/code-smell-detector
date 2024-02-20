function getTimelineTicks(scale, spacing = 50, format) {
  const range = scale.range();
  const domain = scale.domain();
  const ticksCount = Math.floor((range[1] - range[0]) / spacing) + 1;

  scale.domain([0, domain[1] - domain[0]]);
  const ticks = scale.ticks(ticksCount);
  scale.domain(domain);

  return ticks.map(t => ({
    x: scale(t + domain[0]),
    label: format(t + domain[0])
  }));
}