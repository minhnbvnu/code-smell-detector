function smartParse(value) {
  switch (value) {
    case 'Infinity':
      return Infinity;

    case 'NaN':
      return NaN;

    case 'undefined':
      return undefined;

    default:
      return dist_default.a.parse(sanitizeForParse(value));
  }
}