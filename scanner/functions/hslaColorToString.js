function hslaColorToString({
  h,
  s,
  l,
  a
}) {
  return `hsl(${h}deg ${s}% ${l}% / ${a})`;
}