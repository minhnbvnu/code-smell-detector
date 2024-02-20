function getTagContent(content, tag) {
  var tagStart = '<' + tag;
  var tagEnd = '</' + tag;
  var tagStartPos = content.indexOf(tagStart);
  var tagStartPos2 = content.indexOf('>', tagStartPos);
  var tagEndPos = content.lastIndexOf(tagEnd);

  var tagContent = content.slice(tagStartPos2 + 1, tagEndPos);
  return tagContent;
}