function getColor(data, def = [0, 0, 0]) {
  let [r, g, b] = def;

  if (!data) {
    return {
      r,
      g,
      b
    };
  }

  const color = data.trim().split(/\s*,\s*/).map(c => Math.min(Math.max(0, parseInt(c.trim(), 10)), 255)).map(c => isNaN(c) ? 0 : c);

  if (color.length < 3) {
    return {
      r,
      g,
      b
    };
  }

  [r, g, b] = color;
  return {
    r,
    g,
    b
  };
}