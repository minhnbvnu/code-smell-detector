function units(str) {
  if (!SVG_UNITS_RE.test(str)) return 'px';

  return str.match(SVG_UNITS_RE)[0];
}