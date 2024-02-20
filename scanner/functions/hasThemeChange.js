function hasThemeChange(d, p) {
  let keys = Object.keys(d);
  for (let key of keys) {
    if (d[key] !== p[key]) {
      return true;
    }
  }
  return false;
}