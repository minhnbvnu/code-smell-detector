function getXVIZDocUrl(filename) {
  // __IS_LOCAL__ is defined in webpack.config.js
  return __IS_LOCAL__
    ? `./xviz-docs/${filename}`
    : `https://raw.githubusercontent.com/uber/xviz/master/docs/${filename}`;
}