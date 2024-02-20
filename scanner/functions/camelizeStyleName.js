function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}