function parseExtendedQueryString(str) {
  return qs.parse(str, {
    allowPrototypes: true
  });
}