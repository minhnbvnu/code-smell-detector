function optional(string, fallback) {
  const str = undefined === string ? fallback : string;

  return undefined !== str ? `(${str})` : '';
}