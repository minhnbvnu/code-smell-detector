function toColorArray(object) {
  const clrs = object.substring(1);
  const len = clrs.length;
  if (!(len === 3 || len === 4 || len === 6 || len === 8)) {
    return null;
  }

  const color = [];
  const step = clrs.length === 3 || clrs.length === 4 ? 1 : 2;
  for (let i = 0; i < clrs.length; i += step) {
    color.push(parseInt(clrs.substr(i, step), 16));
  }

  return color;
}