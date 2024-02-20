function filterXSS(html, options) {
  var xss = new FilterXSS(options);
  return xss.process(html);
}