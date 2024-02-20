function cleanCodeBlock(type, raw) {
  var clean = '';
  if (type.indexOf('html') >= 0) {
    clean = cleanHtmlText(straightenCurlyQuotesInsideAngleBrackets(raw));
  } else if (type == 'js' ) {
    // TODO: consider preserving curly quotes inside quoted strings
    clean = straightenCurlyQuotes(raw);
    clean = addEnclosingTag('script', clean);
  } else if (type == 'css') {
    clean = straightenCurlyQuotes(raw);
    clean = stripTag('style', clean);
  }
  return clean;
}