function createNonCss(name) {
  return DesignToken.create({
    name,
    cssCustomPropertyName: null
  });
}