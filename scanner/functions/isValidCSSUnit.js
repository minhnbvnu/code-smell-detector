function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
  }