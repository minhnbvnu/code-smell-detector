function filterCSS (html, options) {
  var xss = new FilterCSS(options);
  return xss.process(html);
}