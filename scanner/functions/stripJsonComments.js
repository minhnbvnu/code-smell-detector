function stripJsonComments(str, opts) {
  opts = opts || {};
  var strip = opts.whitespace === false ? strip_json_comments_stripWithoutWhitespace : stripWithWhitespace;
  var insideString = false;
  var insideComment = false;
  var offset = 0;
  var ret = constants["u" /* EMPTY_STRING */];
  for (var i = 0; i < str.length; i++) {
    var currentChar = str[i];
    var nextChar = str[i + 1];
    if (!insideComment && currentChar === '"') {
      var escaped = str[i - 1] === '\\' && str[i - 2] !== '\\';
      if (!escaped) {
        insideString = !insideString;
      }
    }
    if (insideString) {
      continue;
    }
    if (!insideComment && currentChar + nextChar === '//') {
      ret += str.slice(offset, i);
      offset = i;
      insideComment = singleComment;
      i++;
    } else if (insideComment === singleComment && currentChar + nextChar === '\r\n') {
      i++;
      insideComment = false;
      ret += strip(str, offset, i);
      offset = i;
      continue;
    } else if (insideComment === singleComment && currentChar === '\n') {
      insideComment = false;
      ret += strip(str, offset, i);
      offset = i;
    } else if (!insideComment && currentChar + nextChar === '/*') {
      ret += str.slice(offset, i);
      offset = i;
      insideComment = multiComment;
      i++;
      continue;
    } else if (insideComment === multiComment && currentChar + nextChar === '*/') {
      i++;
      insideComment = false;
      ret += strip(str, offset, i + 1);
      offset = i + 1;
      continue;
    }
  }
  return ret + (insideComment ? strip(str.substr(offset), 0, 0) : str.substr(offset));
}