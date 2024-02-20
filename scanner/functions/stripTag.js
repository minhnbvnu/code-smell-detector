function stripTag(tagName, str) {
  var open = new RegExp('<' + tagName + '[^>]*>', 'g');
  var close = new RegExp('</' + tagName + '>', 'g');
  return str.replace(open, '').replace(close, '');
}