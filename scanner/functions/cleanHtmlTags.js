function cleanHtmlTags(str) {
  var tagName = findHtmlTag(str);
  // only warn for certain tags
  if (tagName && contains('i,span,b,strong,em'.split(','), tagName.toLowerCase())) {
    warnOnce('Found a <' + tagName + '> tag. Try using Illustrator formatting instead.');
  }
  return tagName ? straightenCurlyQuotesInsideAngleBrackets(str) : str;
}