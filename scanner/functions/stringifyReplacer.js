function stringifyReplacer(value, indent, stringify) {
  if (typeof value === 'string' && _.startsWith(value, 'CODE:')) {
    return _.replace(_.replace(value, /"/g, '\\"'), /^CODE:/, '');
  }

  return stringify(value);
}