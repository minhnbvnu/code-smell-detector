function isSVG(url) {
    return url && (SVG_DATA_URL_PATTERN.test(url) || SVG_URL_PATTERN.test(url));
  }