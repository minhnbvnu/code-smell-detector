function stripCommentTag(html) {
  var retHtml = "";
  var lastPos = 0;
  while (lastPos < html.length) {
    var i = html.indexOf("<!--", lastPos);
    if (i === -1) {
      retHtml += html.slice(lastPos);
      break;
    }
    retHtml += html.slice(lastPos, i);
    var j = html.indexOf("-->", i);
    if (j === -1) {
      break;
    }
    lastPos = j + 3;
  }
  return retHtml;
}