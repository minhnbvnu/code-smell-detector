function getCSSColor(color, opacity) {
  const rgb = color.slice(0, 3);
  let alpha = opacity;
  if (color.length === 4) {
    alpha *= color[3] / 255;
  }
  return `rgba(${rgb.join(',')},${alpha})`;
}