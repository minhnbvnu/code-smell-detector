function getStreetscapeDocUrl(filename) {
  // __IS_LOCAL__ is defined in webpack.config.js
  return __IS_LOCAL__
    ? `./streetscape-docs/${filename}`
    : `https://raw.githubusercontent.com/uber/streetscape.gl/master/docs/${filename}`;
}