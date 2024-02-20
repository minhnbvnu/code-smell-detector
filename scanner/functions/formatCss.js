function formatCss(obj, indentStr) {
  var css = '';
  var isBlock = !!indentStr;
  for (var key in obj) {
    if (isBlock) {
      css += '\r' + indentStr;
    }
    css += key + ':' + obj[key]+ ';';
  }
  if (css && isBlock) {
    css += '\r';
  }
  return css;
}