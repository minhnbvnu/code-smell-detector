function injectCSSinSVG(content, css) {
  var style = '<style>\n' + css + '\n</style>';
  return content.replace('</svg>', style + '\n</svg>');
}