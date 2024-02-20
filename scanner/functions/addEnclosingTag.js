function addEnclosingTag(tagName, str) {
  var openTag = '<' + tagName;
  var closeTag = '</' + tagName + '>';
  if ((new RegExp(openTag)).test(str) === false) {
    str = openTag + '>\r' + str;
  }
  if ((new RegExp(closeTag)).test(str) === false) {
    str = str + '\r' + closeTag;
  }
  return str;
}