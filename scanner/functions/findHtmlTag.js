function findHtmlTag(str) {
  var match;
  if (str.indexOf('<') > -1) { // bypass regex check
    match = /<(\w+)[^>]*>/.exec(str);
  }
  return match ? match[1] : null;
}